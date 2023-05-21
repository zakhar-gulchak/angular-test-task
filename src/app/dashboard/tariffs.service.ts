import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Tariff {
  price: number;
  downloadSpeed: number;
  uploadSpeed: number;
  benefits: string[];
  tariffType: string;
  providerName: string;
  tariffCost: TariffCost[];
}

export interface TariffCost {
  serviceName: string;
  price: number;
  priceType: PriceType;
}

export enum PriceType {
  oneTime = 'oneTime',
  ongoing = 'ongoing'
}

interface SearchParams {
  sortBy?: string;
  postCode?: string;
  connectionType?: string;
  speed?: number | undefined;
}

@Injectable()
export class TariffsService {
  constructor(private http: HttpClient) {}

  // todo: have to use custom webpack config to pass environment variables to Angular
  search({sortBy, postCode, connectionType, speed}: SearchParams): Observable<Tariff[]> {
    const urlParams = new URLSearchParams();
    sortBy && urlParams.set('sortBy', sortBy);
    postCode && urlParams.set('postCode', postCode);
    connectionType && urlParams.set('connectionType', connectionType);
    speed && urlParams.set('speed', String(speed));
    return this.http
      .get<Tariff[]>(`http://demo8456719.mockable.io/api/v1/tariffs?${urlParams.toString()}`)
      .pipe(catchError(error => {
        console.log(`Error in component ... ${error}`);
        return of<Tariff[]>([]);
      }));
  }
}
