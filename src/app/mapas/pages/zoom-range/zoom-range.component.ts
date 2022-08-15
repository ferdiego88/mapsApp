import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 16;

  center: [number, number] = [-78.96087282197577,-8.091805679758075];

  constructor() {
    console.log('constructor', this.divMapa);
  }

  ngOnDestroy(): void {
    this.mapa.off('zoom', ()=>{});
    this.mapa.off('zoomend', ()=>{});
    this.mapa.off('move', ()=>{});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
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

    this.mapa.on('move', (event) => {
      const target = event.target;
      const {lat, lng} = target.getCenter();
      this.center = [lat,lng];
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
