import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../IProperty.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {

  SellRent = 1;

  properties: Array<IProperty> = [];

  constructor(private housingService: HousingService, private router: ActivatedRoute) {

  }
  ngOnInit(): void {

    if (this.router.snapshot.url.toString()) {
      this.SellRent = 2;
    }

    this.housingService.getAllProperties(this.SellRent).subscribe(
      data => {
        this.properties = data
      }
    );
  }
}
