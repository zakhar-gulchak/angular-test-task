import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

@Component({selector: 'app-dashboard', template: ''})
class DashboardStubComponent {
}

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    declarations: [AppComponent, DashboardStubComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Verivox'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Verivox');
  });

  it('should render logo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header.navbar .verivox-logo')).not.toBeNull();
  });
});
