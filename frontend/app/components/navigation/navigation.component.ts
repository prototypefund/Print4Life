import { Component, OnInit } from '@angular/core';
import { routes } from '../../config/routes';
import { UserService } from '../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../../users/login-modal/login-modal.component';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Location } from '@angular/common';

interface Dropdown {
  name: String;
  elements: Array<Object>;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private title: String = 'Order Management';
  private login: String = 'Login';
  private logout: String = 'Logout';
  private register: String = 'Register';
  private isNavbarCollapsed: Boolean = false;
  private machineDropdown: Dropdown = { name: '', elements: [] };
  private orderDropdown: Dropdown = { name: '', elements: [] };
  private languageDropdown: Dropdown = { name: '', elements: [] };
  private userDropdown: Dropdown = { name: '', elements: [] };
  private userIsLoggedIn: Boolean;
  private user: User;

  constructor(
    private translateService: TranslateService,
    private userService: UserService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.router.events.subscribe(async () => {
      this._init();
    });
  }

  async ngOnInit() {
    this._init();
  }

  public switchLanguage(language) {
    this.translateService.use(language);
    this._translate();
  }

  private async _init() {
    this.userIsLoggedIn = this.userService.isLoggedIn();
    this.user = await this.userService.getUser();
    this._translate();
  }

  private _translate() {
    this.translateService.get(
      ['navigation', 'languages', 'dropdown.machines', 'dropdown.orders', 'dropdown.users']
    ).subscribe((translations => {
      this.userIsLoggedIn = this.userService.isLoggedIn();
      this.title = translations['navigation'].title;
      this.login = translations['navigation'].login;
      this.logout = translations['navigation'].logout;
      this.register = translations['navigation'].register;
      const orderDropdownAuthElements = [{
        name: translations['dropdown.orders'].createOrder,
        routerHref: `${routes.paths.frontend.orders.root}/${routes.paths.frontend.orders.create}`
      }];
      const machineDropdownAuthElements = [
        { name: translations['dropdown.machines'].listMachines, routerHref: routes.paths.frontend.machines.root },
        {
          name: translations['dropdown.machines'].createMachine,
          routerHref: `${routes.paths.frontend.machines.root}/${routes.paths.frontend.machines.create}`
        }];
      const userDropdownAuthElements = [
        { name: translations['dropdown.users'].listUsers, routerHref: routes.paths.frontend.users.root }
      ];
      this.machineDropdown = {
        name: translations['dropdown.machines'].title,
        elements: [

        ]
      };

      this.orderDropdown = {
        name: translations['dropdown.orders'].title,
        elements: [
          { name: translations['dropdown.orders'].listOrders, routerHref: routes.paths.frontend.orders.root }
        ]
      };

      this.languageDropdown = {
        name: translations['languages'].title,
        elements: [
          {
            name: translations['languages'].english,
            isFlag: true,
            class: 'flag-icon flag-icon-gb',
            countryCode: 'en'
          },
          {
            name: translations['languages'].danish,
            isFlag: true,
            class: 'flag-icon flag-icon-dk',
            countryCode: 'dk',
            disabled: true
          },
          {
            name: translations['languages'].german,
            isFlag: true,
            class: 'flag-icon flag-icon-de',
            countryCode: 'de'
          }
        ]
      };


      this.userDropdown = {
        name: translations['dropdown.users'].title,
        elements: [

        ]
      };

      if (this.user) {
        this.userDropdown.elements.push({
          name: translations['dropdown.users'].profile,
          routerHref: `${routes.paths.frontend.users.root}/${routes.paths.frontend.users.update}/${this.user._id}`
        });
      }

      if (this.userIsLoggedIn) {
        this.machineDropdown.elements = this.machineDropdown.elements.concat(machineDropdownAuthElements);
        this.orderDropdown.elements = this.orderDropdown.elements.concat(orderDropdownAuthElements);
        this.userDropdown.elements = this.userDropdown.elements.concat(userDropdownAuthElements);
      }
    }));
  }

  private _login() {
    this.modalService.open(LoginModalComponent).result.then((login) => {
      this.userIsLoggedIn = this.userService.isLoggedIn();
      this.router.navigate([this.router.url]);
    }).catch((err) => {
      this.userIsLoggedIn = this.userService.isLoggedIn();
    });
  }

  private _logout() {
    this.userService.logout();
    this.userIsLoggedIn = this.userService.isLoggedIn();
    this.router.navigate(['/']);
  }

  private _register() {
    this.router.navigate([`${routes.paths.frontend.users.root}/${routes.paths.frontend.users.signup}`]);
  }
}
