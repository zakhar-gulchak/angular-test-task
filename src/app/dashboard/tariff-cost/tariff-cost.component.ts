import { Component, Input } from '@angular/core';

import { PriceType, TariffCost } from "../tariffs.service";

@Component({
  selector: 'app-tariff-cost',
  templateUrl: './tariff-cost.component.html',
  styleUrls: ['tariff-cost.component.scss']
})
export class TariffCostComponent {
  @Input() tariffCost!: TariffCost[];
  protected readonly PriceType = PriceType;
}
