import { Component, Input } from '@angular/core';
import { IPropertyBase } from 'src/app/model/IPropertyBase.interface';

@Component({
  selector: 'app-propert-card',
  templateUrl: './propert-card.component.html',
  styleUrls: ['./propert-card.component.css'],
})
export class PropertCardComponent {
  @Input() property!:IPropertyBase
  @Input() hideIcons!:boolean
  
}
