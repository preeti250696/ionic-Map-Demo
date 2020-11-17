import { Component } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
declare var google:any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: any;
  @ViewChild('map',{read: ElementRef,static:false}) mapRef:ElementRef;
  constructor() {}
  ionViewDidEnter(){
    this.showMap();
  }
  showMap(){
    const location = new google.maps.LatLng(27.897394,78.088013);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }
}
