import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {TariffsService} from "./tariffs.service";
import {asyncData, asyncError} from "../../testing/async-observable-helpers";
import {tariffData} from "../../testing/tariffData";

describe('Tariff Service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let tariffService: TariffsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    tariffService = new TariffsService(httpClientSpy);
  });

  it('should return expected tariffs (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(asyncData(tariffData));

    tariffService.search({}).subscribe({
      next: tariffs => {
        expect(tariffs)
          .withContext('expected tariffs')
          .toEqual(tariffData);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return empty array when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    tariffService.search({}).subscribe({
      next: tariffs => {
        expect(tariffs)
          .withContext('expected tariffs')
          .toEqual([]);
        done();
      },
      error: done.fail
    });
  });
});
