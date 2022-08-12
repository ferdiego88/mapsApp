import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.css']
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var map = new mapboxgl.Map({
        container: 'mapa', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-78.96087282197577,-8.091805679758075],
        zoom: 18
    });
    console.log(map);



  }

}
