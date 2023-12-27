import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IPropertyBase } from '../model/IPropertyBase.interface';
import { Property } from '../model/Property';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) { }

  getAllProperties(sellRent?: number): Observable<Property[]> {
    debugger
    return this.http.get<Property[]>('Data/properties.json').pipe(
      map(data => {
        const propertArray: Array<Property> = [];

        const localStorageProperties = JSON.parse(localStorage.getItem('newProp'));

        if (localStorageProperties) {
          for (const id in localStorageProperties) {

            if (sellRent) {
              if (localStorageProperties[id as keyof object].SellRent == sellRent)
                propertArray.push(localStorageProperties[id as keyof object]);
            } else {
              propertArray.push(localStorageProperties[id as keyof object]);
            }
          }
        }

        for (const id in data) {
          if (sellRent) {
            if (data[id as keyof object].SellRent == sellRent)
              propertArray.push(data[id as keyof object]);
          }
          else {
            propertArray.push(data[id as keyof object]);
          }
        }
        return propertArray;
      }
      ));
  }

  AddProperty(property: Property) {
    let newProp = [property];

    if (localStorage.getItem('newProp')) {
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp'))]
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  NewPropId() {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));

      return +localStorage.getItem('PID');
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }

  GetProperty(id: number) {
    return this.getAllProperties().pipe
      (map(data => {
        return data.find(x => x.Id === id);
      }))
  }

  GetAllCities(): Observable<string[]> {
    return this.http.get<string[]>('https://localhost:7068/api/City');
  }
}
