import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { ModalService } from './modal.service';
import { ModalButton } from '../helper/modal.button';
import { NgxSpinnerService } from 'ngx-spinner';

export enum ErrorType {
  TOKEN_EXPIRED,
  USER_DEACTIVATED,
  UNAUTHORIZED,
  USERNAME_EXISTS,
  EMAIL_EXISTS,
  AUTHENTIFICATION_FAILED,
  MACHINE_TYPE_NOT_SUPPORTED,
  MACHINE_NOT_FOUND,
  UPLOAD_FILE_ERROR,
  DOWNLOAD_FILE_ERROR,
  DELETE_FILE_ERROR,
  INVALID_ID,
  FORBIDDEN,
  SERVER_ERROR,
  MALFORMED_REQUEST,
  IOT_DEVICE_EXISTS,
  OCTOPRINT_ERROR
}

export interface Error {
  type: ErrorType;
  status: Number;
  statusText: String;
  stack: String;
  data: any;
}
@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  isOpen = false;
  constructor(private modalService: ModalService, private userService: UserService,
      private router: Router, private spinner: NgxSpinnerService) {
  }

  public showError(err: Error) {
    let secondButton;
    let modalRef;
    const okButton = new ModalButton('Ok', 'btn btn-primary', 'Ok');
    this.spinner.hide();
    if (!this.isOpen) {
      if (err.hasOwnProperty('type') && (err.type as ErrorType === ErrorType.TOKEN_EXPIRED as ErrorType ||
        err.type as ErrorType === ErrorType.UNAUTHORIZED as ErrorType)) {
        this.userService.logout();
        this.router.navigate(['/']);
        modalRef = this.modalService.openMsgModal(`Error - ${err.status} - ${err.statusText}`, 'modal-header header-danger', [err.stack],
          okButton, secondButton);
        this.isOpen = true;
        modalRef.result.then(() => {
          this.isOpen = false;
        });
      } else {
        const activateRequestResult = 'Send Activate Request';
        if (err.hasOwnProperty('type') && err.type as ErrorType === ErrorType.USER_DEACTIVATED as ErrorType) {
          secondButton = new ModalButton(activateRequestResult, 'btn btn-success', activateRequestResult);
          err.stack = err.stack ? err.stack : 'The User is deactivated. Please request an Activation!';
        }
        modalRef = this.modalService.openMsgModal(`Error - ${err.status} - ${err.statusText}`, 'modal-header header-danger',
          [err.stack], okButton, secondButton);
        this.isOpen = true;
        modalRef.result.then((result) => {
          if (result === activateRequestResult) {
            this.userService.claimActivation(err.data.userId).then(() => {
              this.modalService.openMsgModal(`Activation Request sent!`, 'modal-header header-success',
                ['An Admin was informed that you wish an activation of your user account!'], okButton, undefined);
            });
          }
          this.isOpen = false;
        });
      }
    }
  }
}
