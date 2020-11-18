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
  infoWindows:any = [];
  markers: any = [
    {
      title: 'Nashik',
      latitude: '20.125931',
      longitude:'73.780271'
    },
    {
     title: 'Aligarh Muslim University',
     latitude:'27.904110',
     longitude:'78.076170',
    },
    {
      title: 'Lucknow',
      latitude:'26.690656',
      longitude:'80.992655'
    },
    {
      title:'New Delhi',
      latitude:'28.694443',
      longitude: '77.496670'
    }
  ]
  constructor(private geolocation: Geolocation) { }
  ionViewDidEnter() {
    this.showMap();
  }
  addMarkersToMap(markers){
    for(let marker of markers){
      let position = new google.maps.LatLng(marker.latitude,marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }
  addInfoWindowToMarker(marker){
    let infoWindowContent = '<div id="content">' +
                             '<h2 id="firstHeading class="firstHeading>'+ marker.title + '</h2>' +
                             '<p>Latitude: ' + marker.latitude + '</p>' +
                             '<p>Longitude:' + marker.longitude + '</p>'+
                             '</div>';
        
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click',()=>{
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });                  
    this.infoWindows.push(infoWindow);
    console.log(this.infoWindows,'infowindows');
  }
  closeAllInfoWindows(){
    for(let window of this.infoWindows){
      window.close();
    }
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
      this.addMarkersToMap(this.markers);
    })
  }
}
