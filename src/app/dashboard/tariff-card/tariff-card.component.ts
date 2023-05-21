import { Component, Input, ViewEncapsulation } from '@angular/core';

import { Tariff } from "../tariffs.service";

enum TabId {
  details,
  speed,
  benefits,
}

interface Tab {
  name: string;
  id: TabId;
}

@Component({
  selector: 'app-tariff-card',
  templateUrl: './tariff-card.component.html',
  styleUrls: ['tariff-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TariffCardComponent {
  @Input() tariff!: Tariff;
  @Input() isLoading!: boolean;
  isDetailsOpened: boolean = false;
  tabList: Tab[] = [{
    name: 'Tariff details',
    id: TabId.details,
  }, {
    name: 'Internet Speed',
    id: TabId.speed,
  }, {
    name: 'Benefits',
    id: TabId.benefits,
  }];
  selectedTab: TabId = TabId.details;

  toggleDetails() {
    this.isDetailsOpened = !this.isDetailsOpened;
  }

  chooseTab(tabId: TabId) {
    this.selectedTab = tabId;
  }

  protected readonly TabId = TabId;
}
