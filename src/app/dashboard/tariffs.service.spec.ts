import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {TariffsService} from "./tariffs.service";
import {Tariff} from "./tariff-card/tariff-card.component";
import {PriceType} from "./tariff-cost/tariff-cost.component";
import {asyncData, asyncError} from "../../testing/async-observable-helpers";

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let tariffService: TariffsService;

beforeEach(() => {
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  tariffService = new TariffsService(httpClientSpy);
});

it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
  const expectedData: Tariff[] = [{
      "price": 333,
      "downloadSpeed": 100,
      "uploadSpeed": 50,
      "benefits": ["Benefit 1", "Benefit 2", "Benefit 3", "Benefit 4"],
      "tariffType": "Smart",
      "providerName": "My Provider",
      "tariffCost": [{
        "serviceName": "Basic fee 1-6 month",
        "price": 123.45,
        "priceType": PriceType.ongoing
      }, {
        "serviceName": "Basic fee 7-24 month",
        "price": 657.89,
        "priceType": PriceType.ongoing,
      },{
        "serviceName": "Modem/Router",
        "price": 99.99,
        "priceType": PriceType.oneTime,
      }]
    }];

  httpClientSpy.get.and.returnValue(asyncData(expectedData));

  tariffService.search('term').subscribe({
    next: tariffs => {
      expect(tariffs)
        .withContext('expected heroes')
        .toEqual(expectedData);
      done();
    },
    error: done.fail
  });
  expect(httpClientSpy.get.calls.count())
    .withContext('one call')
    .toBe(1);
});

it('should return an error when the server returns a 404', (done: DoneFn) => {
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404, statusText: 'Not Found'
  });

  httpClientSpy.get.and.returnValue(asyncError(errorResponse));

  tariffService.search('term').subscribe({
    next: tariffs => done.fail('expected an error'),
    error: error  => {
      expect(error.message).toContain('test 404 error');
      done();
    }
  });
});
