import { Component, Input } from '@angular/core';

export interface TariffCost {
  serviceName: string;
  price: number;
  priceType: PriceType;
}

export enum PriceType {
  oneTime = 'oneTime',
  ongoing = 'ongoing'
}

@Component({
  selector: 'app-tariff-cost',
  templateUrl: './tariff-cost.component.html',
  styleUrls: ['tariff-cost.component.scss']
})
export class TariffCostComponent {
  @Input() tariffCost!: TariffCost[];
  protected readonly PriceType = PriceType;
}
