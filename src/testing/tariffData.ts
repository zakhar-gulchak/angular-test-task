import {PriceType, Tariff} from "src/app/dashboard/tariffs.service";

export const tariffData
  : Tariff[] = [{
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
  }, {
    "serviceName": "Modem/Router",
    "price": 99.99,
    "priceType": PriceType.oneTime,
  }]
}];
