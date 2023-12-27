import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/IPropertyBase.interface';
import { Property } from 'src/app/model/Property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})

export class AddPropertyComponent implements OnInit {

  @ViewChild('formTabs') formTabs!: TabsetComponent

  addPropertForm: FormGroup;
  nextClicked: boolean;
  property = new Property();
  cities: any[];

  PropertyTypes: Array<string> = ['House', 'Apartment', 'Duplex']
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']

  propertyView: IPropertyBase = {
    Id: 0,
    Name: '',
    Price: null,
    SellRent: null,
    PType: '',
    FType: '',
    City: '',
    BHK: null,
    RTM: null,
    BuiltArea: 0
  };

  constructor(private fb: FormBuilder, private router: Router, private housingService: HousingService
    , private alertyfy: AlertifyService) { }

  ngOnInit() {
    this.CreateAddPropertyForm();

    this.housingService.GetAllCities().subscribe(data => {
      this.cities = data;
    });

  }
  OnSubmit() {
    this.nextClicked = true;
    if (this.AllTabsValid()) {
      this.mapProperty();
      this.housingService.AddProperty(this.property);
      this.alertyfy.success('Congrats, your property listed successfully on our website');
      console.log(this.addPropertForm);

      if (this.SellRent.value === '2') {
        this.router.navigate(['/rent-property']);
      } else {
        this.router.navigate(['/']);
      }


    } else {
      this.alertyfy.error('Please review the form and provide all valid entries');
    }
  }

  mapProperty(): void {
    this.property.Id = this.housingService.NewPropId();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  AllTabsValid(): boolean {
    if (this, this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }
    if (this, this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }
    if (this, this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if (this, this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }
  CreateAddPropertyForm() {

    this.addPropertForm = this.fb.group({
      BasicInfo: this.fb.group({

        SellRent: ['1', Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: ['', Validators.required],


      }),
      PriceInfo: this.fb.group({

        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],

      }),

      AddressInfo: this.fb.group({

        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],

      }),

      OtherInfo: this.fb.group({

        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null, Validators.required],
        Gated: [null],
        MainEntrance: [null],
        Description: [null],

      })
    });
  }

  selectTab(tabId: number, isCurrentTabValid: boolean) {
    debugger
    this.nextClicked = true;
    if (isCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }

  onBack() {
    this.router.navigate(['/']);
  }

  //#region 
  get BasicInfo() {
    return this.addPropertForm.controls['BasicInfo'] as FormGroup;
  }

  get PriceInfo() {
    return this.addPropertForm.controls['PriceInfo'] as FormGroup;
  }

  get AddressInfo() {
    return this.addPropertForm.controls['AddressInfo'] as FormGroup;
  }
  get OtherInfo() {
    return this.addPropertForm.controls['OtherInfo'] as FormGroup;
  }
  //#endregion

  //#region 
  get SellRent() {
    return this.BasicInfo.controls['SellRent'] as FormControl;
  }

  get BHK() {
    return this.BasicInfo.controls['BHK'] as FormControl;
  }

  get PType() {
    return this.BasicInfo.controls['PType'] as FormControl;
  }

  get FType() {
    return this.BasicInfo.controls['FType'] as FormControl;
  }

  get Name() {
    return this.BasicInfo.controls['Name'] as FormControl;
  }

  get City() {
    return this.BasicInfo.controls['City'] as FormControl;
  }

  get Price() {
    return this.PriceInfo.controls['Price'] as FormControl;
  }

  get BuiltArea() {
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }

  get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }

  get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormControl;
  }

  get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls['Address'] as FormControl;
  }

  get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }

  get RTM() {
    return this.OtherInfo.controls['RTM'] as FormControl;
  }

  get PossessionOn() {
    return this.OtherInfo.controls['PossessionOn'] as FormControl;
  }

  get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
  }

  get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
  }

  get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
  }
  //#endregion
}
