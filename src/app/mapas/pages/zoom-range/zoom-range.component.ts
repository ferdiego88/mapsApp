import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 16;
  constructor() {
    console.log('constructor', this.divMapa);
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-78.96087282197577,-8.091805679758075],
      zoom: this.zoomLevel
  });

    this.mapa.on('zoom', ()=> {
       this.zoomLevel =  this.mapa.getZoom();
    })

    this.mapa.on('zoomend', ()=> {
        if (this.mapa.getZoom() > 18) {
            this.mapa.zoomTo(18)
        }
    })

  }

  zoomOut() {
      this.mapa.zoomOut();
  }

  zoomIn() {
      this.mapa.zoomIn();
  }

  zoomCambio(valor: string) {
  this.mapa.zoomTo(Number(valor)
  );
  }
}
