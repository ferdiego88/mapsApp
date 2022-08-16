import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number]
}
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit{


  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 16;

  center: [number, number] = [-79.028684,-8.111585];

  // Arreglo de marcadores
  marcadoresColor: MarcadorColor[] = [];

  constructor() { }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
  });

  this.getMarkersLocalStorage();


  // Agregar un elemento html personalizado como marcador
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola mundo'
    // const marker = new mapboxgl.Marker({
    //   element: markerHtml
    // })

    // Marcador HardCodeado
    // const marker = new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.mapa)
    // ;
  }

  irMarcador(marker?: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marker!.getLngLat()
    })
  }

  agregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const newmarker = new mapboxgl.Marker( {
      draggable: true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

      this.marcadoresColor.push({
        color,
        marker: newmarker
      });

      this.saveMarkersLocalStorage();
      newmarker.on('dragend',() => {
        this.saveMarkersLocalStorage();
      })

  }

  saveMarkersLocalStorage () {
    const lngLatArr: MarcadorColor[] = [];
    this.marcadoresColor.forEach( m => {
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();
      lngLatArr.push({
        color,
        centro: [lng, lat]
      })
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  getMarkersLocalStorage () {
    if(!localStorage.getItem('marcadores')){
      return;
    }
    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);
    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa)
        this.marcadoresColor.push({
          marker: newMarker,
          color:m.color
        });

        newMarker.on('dragend',() => {
          this.saveMarkersLocalStorage();
        })
    })

  }

  deleteMarker(i: number){
    this.marcadoresColor[i].marker?.remove();
    this.marcadoresColor.splice(i,1);
    this.saveMarkersLocalStorage();
  }
}
