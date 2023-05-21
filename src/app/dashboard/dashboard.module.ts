import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { TariffCardComponent } from './tariff-card/tariff-card.component';
import { TariffCostComponent } from './tariff-cost/tariff-cost.component';
import { SpinnerComponent } from "../shared/spinner/spinner.component";

@NgModule({
  declarations: [
    DashboardComponent,
    TariffCardComponent,
    TariffCostComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
