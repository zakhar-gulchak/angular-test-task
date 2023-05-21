import { Component } from '@angular/core';

import { TariffsService, Tariff } from './tariffs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
// todo rename component
export class DashboardComponent {
  tariffs: Tariff[] = [];
  isCompareEnabled = false;
  connectionsList: string[] = ['Fast', 'Slow', 'Very fast', 'Very slow'];
  sortingList: string[] = ['Price: ascending', 'Price: descending'];
  speedList: number[] = [10, 20, 50, 100];
  selectedSpeed: number | undefined;
  postalCode: string = '';
  connectionType: string = '';
  sortBy: string = '';
  isTariffsLoading: boolean = false;

  constructor(
    private tariffsService: TariffsService,
  ) {}

  compare() {
    this.isTariffsLoading = true;
    // todo params
    this.tariffsService.search('text')
      .subscribe(resp => {
        this.tariffs = resp;
        this.isTariffsLoading = false;
      });
  }

  selectConnection = (connectionType: string) => {
    this.connectionType = connectionType;
    this.isCompareEnabled && this.compare();
  }

  selectSortBy = (sortBy: string) => {
    this.sortBy = sortBy;
    this.isCompareEnabled && this.compare();
  }

  selectSpeed(speed: number) {
    this.selectedSpeed = speed;
    this.updateCompareEnabledStatus();
  }

  updatePostalCode(event: any) {
    this.postalCode = event.target.value;
    this.updateCompareEnabledStatus();
  }

  private updateCompareEnabledStatus() {
    this.isCompareEnabled = Boolean(this.selectedSpeed && this.postalCode.length === 5);
  }
}
