import {Component, Input, NO_ERRORS_SCHEMA} from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import {of} from "rxjs";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { tariffData } from "src/testing/tariffData";
import { DashboardComponent } from './dashboard.component';
import { TariffsService } from "./tariffs.service";

@Component({selector: 'app-spinner', template: '<div class="app-spinner"></div>'})
class SpinnerStubComponent {
}

@Component({selector: 'app-dropdown', template: '<div class="app-dropdown"></div>'})
class DropdownStubComponent {
}

@Component({selector: 'app-tariff-card', template: '<div class="app-tariff-card"></div>'})
class TariffCardStubComponent {
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let compiled: HTMLElement;
  let searchSpy: jasmine.SpyObj<any>;

  beforeEach(() => {
    const tariffsService = jasmine.createSpyObj('TariffsService', ['search']);
    searchSpy = tariffsService.search.and.returnValue(of([tariffData]));

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [DashboardComponent, SpinnerStubComponent, DropdownStubComponent, TariffCardStubComponent],
      providers: [{ provide: TariffsService, useValue: tariffsService }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render initial dashboard state', () => {
    compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.internet-card .card-header')?.textContent).toContain('Internet');
    expect(compiled.querySelector('.internet-card .postal-input')).not.toBeNull();
    expect(compiled.querySelectorAll('.internet-card .speed-box').length).toBe(4);
    expect(compiled.querySelector('.internet-card .submit-button')?.classList.contains('disabled')).toBeTrue();

    // no filter bar and tariff card on the screen
    expect(compiled.querySelector('.tariffs-block .filters-block')).toBeNull();
    expect(compiled.querySelector('.tariffs-block .tariff-card')).toBeNull();
  });

  it('should enable compare button on parameters entered and make request with params on button pressing', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const postcodeInput: HTMLInputElement = compiled.querySelector('.internet-card .postal-input input')!;
    const speedBox = compiled.querySelector('.internet-card .speed-box');

    postcodeInput.value = '4342'; // length < 5
    postcodeInput?.dispatchEvent(new Event('keyup'));
    speedBox?.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.internet-card .speed-box').length).toBe(4);
    expect(compiled.querySelector('.internet-card .submit-button')?.classList.contains('disabled')).toBeTrue();

    postcodeInput.value = '43423';
    postcodeInput?.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    expect(compiled.querySelector('.internet-card .submit-button')?.classList.contains('disabled')).toBeFalse();

    const compareButton = compiled.querySelector('.internet-card .submit-button');
    compareButton?.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    // expect(compiled.querySelector('app-spinner')).not.toBeNull();

    expect(searchSpy.calls.count()).toBe(1);
    expect(searchSpy.calls.argsFor(0)).toEqual(['text']);
  });

  // it('should render filter bar and spinner while data is loading', () => {
  // })
  //
  // it('should render filter bar and tariff cards when there are results', () => {});
  //
  // it('should should render filter bar and no tariffs on http error', () => {})
  //
  // it('should make new request on filter values changing', () => {})
});
