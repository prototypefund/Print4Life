import { Component, OnInit } from '@angular/core';
import { ConfigService, SpinnerConfig } from '../../config/config.service';
import { routes } from '../../config/routes';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { MachineService } from '../../services/machine.service';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import { FablabService } from '../../services/fablab.service';
import { MessageModalComponent, ModalButton } from '../../components/message-modal/message-modal.component';
import { OctoprintModalComponent } from '../../components/octoprint-modal/octoprint-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenericService } from '../../services/generic.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { User } from 'frontend/app/models/user.model';
import { Schedule } from 'frontend/app/models/schedule.model';
import { ScheduleService } from 'frontend/app/services/schedule.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  private config: any;
  private userIsLoggedIn: boolean;
  private loggedInUser: User;
  loadingOrder: boolean;
  userCanDownload: boolean;
  printFilesAvailable: boolean;
  editIcon: Icon;
  deleteIcon: Icon;
  processIcon: Icon;
  toggleOnIcon: Icon;
  toggleOffIcon: Icon;
  spinnerConfig: SpinnerConfig;
  editLink: String;
  editor: User = new User(
    undefined, undefined, '', '', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  editorLink: String;
  owner: User = new User(
    undefined, undefined, '', '', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  ownerLink: String;
  order: Order = new Order(
    undefined,
    undefined,
    undefined,
    [],
    undefined,
    undefined,
    [],
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    false,
    undefined
  );
  schedule: Schedule;
  machine: any;
  fablab: any;

  translationFields = {
    tooltips: {
      delete: '',
      edit: '',
      print: '',
    },
    labels: {
      owner: '',
      editor: '',
      status: '',
      createdAt: '',
      machine: '',
      fablab: '',
      comments: '',
      author: '',
      content: '',
      files: '',
      file: '',
      addressTitle: '',
      latestVersion: '',
      scheduledFor: ''
    },
    modals: {
      ok: '',
      abort: '',
      cancel: '',
      deleteReturnValue: '',
      abortReturnValue: '',
      cancelReturnValue: '',
      deleteHeader: '',
      deleteQuestion: '',
      deleteQuestion2: '',
      deleteWarning: '',
      printHeader: '',
      addressLabel: '',
      apiKeyLabel: '',
      fileSelectLabel: ''
    }
  };

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private machineService: MachineService,
    private fablabService: FablabService,
    private configService: ConfigService,
    private modalService: NgbModal,
    private genericService: GenericService,
    private translateService: TranslateService,
    private userService: UserService,
    private scheduleService: ScheduleService,
    private spinner: NgxSpinnerService
  ) {
    this.config = this.configService.getConfig();
    this.editIcon = this.config.icons.edit;
    this.deleteIcon = this.config.icons.delete;
    this.toggleOnIcon = this.config.icons.toggleOn;
    this.toggleOffIcon = this.config.icons.toggleOff;
    this.processIcon = this.config.icons.processIcon;
    this.spinnerConfig = new SpinnerConfig(
      'Loading Order', this.config.spinnerConfig.bdColor,
      this.config.spinnerConfig.size, this.config.spinnerConfig.color, this.config.spinnerConfig.type);
  }

  async ngOnInit() {
    this.translateService.onLangChange.subscribe(() => {
      this._translate();
    });

    this.route.paramMap
      .subscribe(async (params) => {
        if (params && params.get('id')) {
          this.spinner.show();
          this.orderService.getOrderById(params.get('id')).then(async (result) => {
            if (result && result.order) {
              this.order = result.order;
              this.userIsLoggedIn = this.userService.isLoggedIn();
              this.loggedInUser = await this.userService.getUser();
              this.userCanDownload = this.order.shared as boolean || (this.loggedInUser && this.loggedInUser.role &&
                this.loggedInUser.role.role && (this.loggedInUser.role.role === 'editor' || this.loggedInUser.role.role === 'admin'
                  || this.loggedInUser._id === this.order.owner));
              result.order.comments.forEach(async comment => {
                const author = await this.userService.getNamesOfUser(comment.author);
                comment['link'] = `/${routes.paths.frontend.users.root}/${author._id}`;
              });
              result.order.files.forEach(async file => {
                file['link'] = `${routes.backendUrl}/` +
                  `${routes.paths.backend.orders.root}/` +
                  (this.order.shared ? `${routes.paths.backend.orders.shared}/` : ``) +
                  `${this.order._id}/` +
                  `${routes.paths.backend.orders.files}/${file.id}?token=${this.userService.getToken()}`;
              });
              // sort files to show deprecated last
              this.orderService.sortFilesByDeprecated(result.order.files);
              this.owner = await this.userService.getNamesOfUser(this.order.owner);
              this.owner['fullname'] = this.owner.firstname + ' ' + this.owner.lastname;
              this.ownerLink = `/${routes.paths.frontend.users.root}/${this.owner._id}`;
              if (this.order.editor) {
                this.editor = await this.userService.getNamesOfUser(this.order.editor);
                this.editor['fullname'] = this.editor.firstname + ' ' + this.editor.lastname;
                this.editorLink = `/${routes.paths.frontend.users.root}/${this.editor._id}`;
              }
              this.order.comments.forEach(async (comment) => {
                const author = await this.userService.getNamesOfUser(comment.author);
                comment['authorName'] = author.firstname + ' ' + author.lastname;
              });
              try {
                const res = await this.orderService.getSchedule(this.order._id as string);
                if (res) {
                  const schedule: Schedule = res.schedule;
                  this.schedule = this.scheduleService.decompressScheduleDates(schedule);
                }
              } catch (err) {
                this.schedule = undefined;
              }

              this.editLink = `/${routes.paths.frontend.orders.root}/${routes.paths.frontend.orders.update}/${this.order._id}/`;
              this.editLink = this.order.shared
                ? `/${routes.paths.frontend.orders.root}/${routes.paths.frontend.orders.shared.root}/`
                + `${routes.paths.frontend.orders.shared.update}/${this.order._id}/`
                : `/${routes.paths.frontend.orders.root}/${routes.paths.frontend.orders.update}/${this.order._id}/`;
              this.fablabService.getFablab(this.order.fablabId).then(async result => {
                this.fablab = result.fablab;
                if (this.order.machine.type.toLowerCase() !== 'unknown') {
                  const result = await this.machineService.get(this.order.machine.type, this.order.machine._id);
                  const type = this.machineService.camelCaseTypes(this.order.machine.type);
                  this.machine = result[`${type}`];
                  this.machine['detailView'] = `/${routes.paths.frontend.machines.root}/${type}s/${this.machine._id}/`;
                } else {
                  this.machine = { type: this.order.machine.type.toLowerCase() };
                }
                this.printFilesAvailable = this.order.files.filter((file) => file.contentType === 'text/x.gcode'
                  || file.filename.split('.')[1] === 'gcode').length > 0;
                this._translate();
                this.spinner.hide();
              });
            }
          });
        }
      });
  }

  public startPrintJob() {
    const startButton = new ModalButton(this.translationFields.modals.printHeader, 'btn btn-success', '');
    const cancelButton = new ModalButton(this.translationFields.modals.cancel, 'btn btn-secondary',
      this.translationFields.modals.cancelReturnValue);
    this._openOctoprintModal(this.translationFields.modals.printHeader,
      'modal-header header-primary', this.translationFields.modals.addressLabel, this.translationFields.modals.apiKeyLabel,
      this.translationFields.modals.fileSelectLabel, this.order.files.filter((file) => file.contentType === 'text/x.gcode'
        || file.filename.split('.')[1] === 'gcode'),
      startButton, cancelButton);
  }

  public delete() {
    const deleteButton = new ModalButton(this.translationFields.modals.ok, 'btn btn-danger',
      this.translationFields.modals.deleteReturnValue);
    const abortButton = new ModalButton(this.translationFields.modals.abort, 'btn btn-secondary',
      this.translationFields.modals.abortReturnValue);
    const modalRef = this._openMsgModal(this.translationFields.modals.deleteHeader,
      'modal-header header-danger',
      [`${this.translationFields.modals.deleteQuestion} ${this.order.projectname} ${this.translationFields.modals.deleteQuestion2}`,
      `${this.translationFields.modals.deleteWarning}`],
      deleteButton, abortButton);
    modalRef.result.then((result) => {
      if (result === deleteButton.returnValue) {
        this.orderService.deleteOrder(this.order._id).then(() => {
          this.genericService.back();
        });
      }
    });
  }

  // Private Functions

  private _openMsgModal(title: String, titleClass: String, messages: Array<String>, button1: ModalButton, button2: ModalButton) {
    const modalRef = this.modalService.open(MessageModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = title;
    if (titleClass) {
      modalRef.componentInstance.titleClass = titleClass;
    }
    modalRef.componentInstance.messages = messages;
    modalRef.componentInstance.button1 = button1;
    modalRef.componentInstance.button2 = button2;
    return modalRef;
  }

  private _openOctoprintModal(title: String, titleClass: String, addressLabel: String,
    apiKeyLabel: String, fileSelectLabel: String, selectItems: Array<any>, button1: ModalButton, button2: ModalButton) {
    const modalRef = this.modalService.open(OctoprintModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = title;
    if (titleClass) {
      modalRef.componentInstance.titleClass = titleClass;
    }
    modalRef.componentInstance.addressLabel = addressLabel;
    modalRef.componentInstance.apiKeyLabel = apiKeyLabel;
    modalRef.componentInstance.fileSelectLabel = fileSelectLabel;
    modalRef.componentInstance.selectItems = selectItems;
    modalRef.componentInstance.button1 = button1;
    modalRef.componentInstance.button2 = button2;
  }

  private _translateStatus(): Promise<String> {
    return new Promise((resolve) => {
      this.translateService.get(['status']).subscribe((translations) => {
        resolve(translations['status'][`${this.order.status}`]);
      });
    });
  }

  private _translateMachineType(): Promise<String> {
    return new Promise((resolve) => {
      this.translateService.get(['deviceTypes']).subscribe((translations => {
        resolve(translations['deviceTypes'][`${this.machine.type}`]);
      }));
    });
  }

  private _translate() {
    const currentLang = this.translateService.currentLang || this.translateService.getDefaultLang();
    this.translateService.get(['orderDetail', 'deviceTypes', 'status', 'date', 'buttonTooltips']).subscribe((translations => {
      if (this.order) {
        if (this.schedule) {
          this.schedule['shownStartDate'] = this.genericService.translateDate(
            this.schedule.startDate, currentLang, translations['date'].dateTimeFormat);
          this.schedule['shownEndDate'] = this.genericService.translateDate(
            this.schedule.endDate, currentLang, translations['date'].dateTimeFormat);
        }

        this.order['shownCreatedAt'] = this.genericService.translateDate(
          this.order.createdAt, currentLang, translations['date'].dateTimeFormat);
        this.order.files.forEach((file) => {
          file['shownCreatedAt'] = this.genericService.translateDate(
            file.createdAt, currentLang, translations['date'].dateTimeFormat);
        });
      }
      if (this.order && this.order.status) {
        this._translateStatus().then((shownStatus) => {
          this.order['shownStatus'] = shownStatus;
        });
      }

      if (this.machine && this.machine.type) {
        this._translateMachineType().then((shownType) => {
          this.machine['shownType'] = shownType;
        });
      }

      if (this.order && this.order.comments) {
        this.order.comments.forEach((comment) => {
          if (comment.createdAt) {
            comment['shownCreatedAt'] = this.genericService.translateDate(
              comment.createdAt, currentLang, translations['date'].dateTimeFormat);
          }
        });
      }

      this.translationFields = {
        tooltips: {
          delete: translations['orderDetail'].buttons.tooltips.delete,
          edit: translations['orderDetail'].buttons.tooltips.edit,
          print: translations['orderDetail'].buttons.tooltips.print,
        },
        labels: {
          owner: translations['orderDetail'].labels.owner,
          editor: translations['orderDetail'].labels.editor,
          status: translations['orderDetail'].labels.status,
          createdAt: translations['orderDetail'].labels.createdAt,
          machine: translations['orderDetail'].labels.machine,
          fablab: translations['orderDetail'].labels.fablab,
          comments: translations['orderDetail'].labels.comments,
          author: translations['orderDetail'].labels.author,
          content: translations['orderDetail'].labels.content,
          files: translations['orderDetail'].labels.files,
          file: translations['orderDetail'].labels.file,
          addressTitle: translations['orderDetail'].labels.addressTitle,
          latestVersion: translations['orderDetail'].labels.latestVersion,
          scheduledFor: translations['orderDetail'].labels.scheduledFor
        },
        modals: {
          ok: translations['orderDetail'].modals.ok,
          abort: translations['orderDetail'].modals.abort,
          cancel: translations['orderDetail'].modals.cancel,
          deleteReturnValue: translations['orderDetail'].modals.deleteReturnValue,
          abortReturnValue: translations['orderDetail'].modals.abortReturnValue,
          cancelReturnValue: translations['orderDetail'].modals.cancelReturnValue,
          deleteHeader: translations['orderDetail'].modals.deleteHeader,
          deleteQuestion: translations['orderDetail'].modals.deleteQuestion,
          deleteQuestion2: translations['orderDetail'].modals.deleteQuestion2,
          deleteWarning: translations['orderDetail'].modals.deleteWarning,
          printHeader: translations['orderDetail'].modals.printHeader,
          addressLabel: translations['orderDetail'].modals.addressLabel,
          apiKeyLabel: translations['orderDetail'].modals.apiKeyLabel,
          fileSelectLabel: translations['orderDetail'].modals.fileSelectLabel,
        }
      };
    }));
  }
}
