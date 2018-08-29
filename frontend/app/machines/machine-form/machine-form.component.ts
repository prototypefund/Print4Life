import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MachineService } from '../../services/machine.service';
import { FablabService } from '../../services/fablab.service';
import { Machine, Printer, MillingMachine, OtherMachine, Lasercutter, Material, Lasertype } from '../../models/machines.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent, ModalButton } from '../../components/message-modal/message-modal.component';
import { ConfigService } from '../../config/config.service';
import { GenericService } from '../../services/generic.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-machine-form',
  templateUrl: './machine-form.component.html',
  styleUrls: ['./machine-form.component.css']
})
export class MachineFormComponent implements OnInit {
  config: any;
  machineTypes: Array<String> = [];
  selectedType: String = '';
  editView: Boolean;
  submitted: Boolean = false;
  model: Machine;
  fablabs: Array<any>;
  materialsArr: Array<Material>;
  laserTypesArr: Array<Lasertype>;
  loadingFablabs: Boolean;
  loadingMaterials: Boolean;
  loadingLaserTypes: Boolean;
  translationFields = {
    title: '',
    shownMachineTypes: [],
    shownType: '',
    generalData: '',
    labels: {
      submit: '',
      ok: '',
      error: '',
      deviceName: '',
      fablab: '',
      manufacturer: '',
      data: '',
      camSoftware: '',
      nozzleDiameter: '',
      materials: '',
      printVolume: '',
      printResolution: '',
      numberOfExtruders: '',
      pictureURL: '',
      comment: '',
      movementSpeed: '',
      stepSize: '',
      workspace: '',
      laserTypes: '',
      laserPower: '',
      maxResolution: '',
      typeOfMachine: ''
    },
    messages: {
      deviceName: '',
      fablab: '',
      manufacturer: '',
      typeOfMachine: '',
      updatingSuccessHeader: '',
      creatingSuccessHeader: '',
      updatingSuccess: '',
      updatingError: '',
      creatingSuccess: '',

    }
  };

  constructor(
    private machineService: MachineService,
    private fablabService: FablabService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private configService: ConfigService,
    private genericService: GenericService,
    private translateService: TranslateService) {
    this.config = this.configService.getConfig();
    this.route.params.subscribe(params => {
      if (params.type && params.id) {
        const type = params.type.substr(0, params.type.length - 1);
        this.machineService.get(type, params.id).then((result) => {
          this.model = result[type];
          this.selectedType = this.machineService.uncamelCase(type);
          this._loadFablabs();
          this._loadMaterials(this.selectedType);
          this._loadLaserTypes();
        });
      }
    });
    this.router.events.subscribe(() => {
      const route = this.location.path();
      if (route.indexOf('/update') >= 0 && !this.editView) {
        this.editView = true;
      } else {
        if (this.editView) {
        }
        this.editView = false;
      }
      this._loadMachineTypes();
    });
  }

  async ngOnInit() {
    this.translateService.onLangChange.subscribe(() => {
      this._translate();
    });
    this._selectType('');
    this.loadingFablabs = true;
    this._loadFablabs();
    await this._loadMaterials(this.selectedType);
    await this._loadLaserTypes();
    await this._loadMachineTypes();
    this._translate();
  }

  onSubmit() {
    if (!this.editView) {
      this.machineService.create(this.machineService.camelCaseTypes(this.selectedType), this.model).then((result) => {
        if (result) {
          this._openSuccessMsg();
        } else {
          this._openErrMsg(undefined);
        }
        this.submitted = true;
      }).catch((err) => {
        this._openErrMsg(err);
      });
    } else {
      this.machineService.update(this.machineService.camelCaseTypes(this.selectedType), this.model._id, this.model).then((result) => {
        if (result) {
          this._openSuccessMsg();
        } else {
          this._openErrMsg(undefined);
        }
        this.submitted = true;
      }).catch((err) => {
        this._openErrMsg(err);
      });
    }

  }

  private _openSuccessMsg() {
    const okButton = new ModalButton(this.translationFields.labels.ok, 'btn btn-primary', this.translationFields.labels.ok);
    let msgHeader;
    let msg;
    this.editView ?
      msgHeader = this.translationFields.messages.updatingSuccessHeader
      : msgHeader = this.translationFields.messages.creatingSuccessHeader;
    this.editView ? msg = this.translationFields.messages.updatingSuccess : msg = this.translationFields.messages.creatingSuccess;
    this._openMsgModal(msgHeader, 'modal-header header-success',
      msg, okButton, undefined).result.then(() => {
        this.genericService.back();
      });
  }

  private _openErrMsg(err) {
    let errorMsg;
    this.editView ? errorMsg = ''
      : errorMsg = this.translationFields.messages.updatingError;
    const okButton = new ModalButton(this.translationFields.labels.ok, 'btn btn-primary', this.translationFields.labels.ok);
    this._openMsgModal(this.translationFields.labels.error, 'modal-header header-danger', errorMsg,
      okButton, undefined);
  }

  private _openMsgModal(title: String, titleClass: String, msg: String, button1: ModalButton, button2: ModalButton) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.titleClass = titleClass;
    modalRef.componentInstance.msg = msg;
    modalRef.componentInstance.button1 = button1;
    modalRef.componentInstance.button2 = button2;
    return modalRef;
  }

  private async _loadLaserTypes() {
    this.loadingLaserTypes = true;
    this.laserTypesArr = (await this.machineService.getLaserTypes()).laserTypes;
    this.loadingLaserTypes = false;
  }

  private _selectType(type) {
    this.translationFields.shownType = type;
    this.translateService.get(['deviceTypes']).subscribe((translations => {
      this.machineTypes.forEach((machineType) => {
        const type = translations['deviceTypes'][`${this.machineService.camelCaseTypes(machineType)}`];
        if (type) {
          if (this.translationFields.shownType === type) {
            this.selectedType = machineType;
          }
        }
      });
    }));
    this.model = this._initModel(this.selectedType);
    this.loadingMaterials = true;
    this._loadMaterials(this.selectedType);
  }

  private async _loadMachineTypes() {
    this.machineTypes = (await this.machineService.getAllMachineTypes()).types;

  }

  private async _loadFablabs() {
    this.fablabs = (await this.fablabService.getFablabs()).fablabs;
    this.loadingFablabs = false;
  }

  private async _loadMaterials(type) {
    if (type && type !== '') {
      this.materialsArr = (await this.machineService.getMaterialsByMachineType(this.machineService.camelCaseTypes(type))).materials;
      this.loadingMaterials = false;
    }
  }

  private _initModel(type) {
    switch (type) {
      case 'Printer':
        return new Printer(undefined, undefined, undefined,
          this.machineService.camelCaseTypes(type), undefined, undefined, undefined, undefined, undefined,
          undefined, undefined, undefined, undefined, undefined, undefined,
          undefined, undefined);
      case 'Milling Machine':
        return new MillingMachine(undefined, undefined, undefined, this.machineService.camelCaseTypes(type),
          undefined, undefined, undefined, undefined, undefined, undefined,
          undefined, undefined, undefined);
      case 'Other Machine':
        return new OtherMachine(undefined, undefined, undefined, this.machineService.camelCaseTypes(type),
          undefined, undefined, undefined, undefined);
      case 'Lasercutter':
        return new Lasercutter(undefined, undefined, undefined, this.machineService.camelCaseTypes(type),
          undefined, undefined, undefined, undefined, undefined, undefined,
          undefined, undefined, undefined, undefined);
      default:
        return new Machine(undefined, undefined, undefined, undefined, this.machineService.camelCaseTypes(type), undefined);
    }
  }

  private _translate() {
    this.translateService.get(['machineForm', 'deviceTypes']).subscribe((translations => {
      const shownMachineTypes = [];
      this.machineTypes.forEach((mType) => {
        const camelType = this.machineService.camelCaseTypes(mType);
        const translated = translations['deviceTypes'][`${camelType}`];
        if (translated) {
          shownMachineTypes.push(translated);
        }
      });
      this.translationFields = {
        title: translations['machineForm'].title,
        shownMachineTypes: shownMachineTypes,
        shownType: translations['deviceTypes'][`${this.machineService.camelCaseTypes(this.selectedType)}`],
        generalData: translations['machineForm'].generalData,
        labels: {
          submit: this.editView ? translations['machineForm'].labels.edit : translations['machineForm'].labels.create,
          ok: translations['machineForm'].labels.ok,
          error: translations['machineForm'].labels.error,
          deviceName: translations['machineForm'].labels.deviceName,
          fablab: translations['machineForm'].labels.fablab,
          manufacturer: translations['machineForm'].labels.manufacturer,
          data: translations['machineForm'].labels.data,
          camSoftware: translations['machineForm'].labels.camSoftware,
          nozzleDiameter: translations['machineForm'].labels.nozzleDiameter,
          materials: translations['machineForm'].labels.materials,
          printVolume: translations['machineForm'].labels.printVolume,
          printResolution: translations['machineForm'].labels.printResolution,
          numberOfExtruders: translations['machineForm'].labels.numberOfExtruders,
          pictureURL: translations['machineForm'].labels.pictureURL,
          comment: translations['machineForm'].labels.comment,
          movementSpeed: translations['machineForm'].labels.movementSpeed,
          stepSize: translations['machineForm'].labels.stepSize,
          workspace: translations['machineForm'].labels.workspace,
          laserTypes: translations['machineForm'].labels.laserTypes,
          laserPower: translations['machineForm'].labels.laserPower,
          maxResolution: translations['machineForm'].labels.maxResolution,
          typeOfMachine: translations['machineForm'].labels.typeOfMachine
        },
        messages: {
          deviceName: translations['machineForm'].messages.deviceName,
          fablab: translations['machineForm'].messages.fablab,
          manufacturer: translations['machineForm'].messages.manufacturer,
          typeOfMachine: translations['machineForm'].messages.typeOfMachine,
          updatingSuccessHeader: translations['machineForm'].messages.updatingSuccessHeader,
          creatingSuccessHeader: translations['machineForm'].messages.creatingSuccessHeader,
          updatingSuccess: translations['machineForm'].messages.updatingSuccessMsg,
          updatingError: translations['machineForm'].messages.updatingError,
          creatingSuccess: translations['machineForm'].messages.creatingSuccessMsg,
        }
      };
    }));
  }

}
