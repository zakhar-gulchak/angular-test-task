import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Tariff } from "./tariff-card/tariff-card.component";

@Injectable()
export class TariffsService {
  constructor(private http: HttpClient) {}

  // todo: have to use custom webpack config to pass environment variables to Angular
  search(term: string): Observable<Tariff[]> {
    return this.http
      .get<Tariff[]>(`http://demo8456719.mockable.io/api/v1/tariffs?name=${term}`)
      .pipe(catchError(error => {
        console.log(`Error in component ... ${error}`);
        return of<Tariff[]>([]);
      }));
  }
}
