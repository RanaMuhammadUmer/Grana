import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/Property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  propertyId!: number;
  property = new Property();

  constructor(private route: ActivatedRoute, private router: Router, private service: HousingService) { }

  ngOnInit() {
    debugger
    this.propertyId = +this.route.snapshot.params['id'];

    this.route.data.subscribe((data:Property)=>{
      this.property = data['prp'];
    })
  }

}
