import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IProperty } from '../Property/IProperty.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) { }

  getAllProperties(sellRent:number): Observable<IProperty[]> {
    return this.http.get<IProperty[]>('Data/properties.json').pipe(
      map(data => {
        const propertArray: Array<IProperty> = [];
        for (const id in data) {
          if(data[id as keyof object].SellRent==sellRent)
          propertArray.push(data[id as keyof object]);
        }
        return propertArray;
      }
      ));
  }
}
