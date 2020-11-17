import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: any;
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  constructor(private geolocation: Geolocation) { }
  ionViewDidEnter() {
    this.showMap();
  }
  showMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      const options = {
        center: location,
        zoom: 15,
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    })
  }
}
