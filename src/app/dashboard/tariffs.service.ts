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

@Injectable()
export class TariffsService {
  constructor(private http: HttpClient) {}

  // todo: have to use custom webpack config to pass environment variables to Angular
  search(term: string): Observable<Tariff[]> {
    // todo: params
    return this.http
      .get<Tariff[]>(`http://demo8456719.mockable.io/api/v1/tariffs?name=${term}`)
      .pipe(catchError(error => {
        console.log(`Error in component ... ${error}`);
        return of<Tariff[]>([]);
      }));
  }
}
