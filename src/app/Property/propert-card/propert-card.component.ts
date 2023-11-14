import { Component } from '@angular/core';

@Component({
  selector: 'app-propert-card',
  templateUrl: './propert-card.component.html',
  styleUrls: ['./propert-card.component.css'],
})
export class PropertCardComponent {
  property: any = {
    Id: 1,
    Name: "Bali House",
    Type: 'House',
    Price: 1200,
  };
}
