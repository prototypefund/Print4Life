import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CardComponent } from '../../components/card/card.component';

import {
  HttpClientTestingModule
} from '@angular/common/http/testing';

import { MachineListComponent } from './machine-list.component';

describe('MachineListComponent', () => {
  let component: MachineListComponent;
  let fixture: ComponentFixture<MachineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MachineListComponent, CardComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});