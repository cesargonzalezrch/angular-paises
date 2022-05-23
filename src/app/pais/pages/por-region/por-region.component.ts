import { Component, OnInit } from '@angular/core';
import { Country } from '../../interface/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
  button {
    margin-right: 5px;
  }
  `]
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'];
  regionActiva: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {

  }

  getClaseCss(region: string): string {
    return (this.regionActiva === region) ? 'btn btn-primary' : ' btn btn-outline-primary';
  }

  activarRegion(region: string) {
    if (this.regionActiva === region) {
      return
    }
    this.regionActiva = region;
    this.paises = []
    this.paisService.buscarRegion(region)
      .subscribe((paises) => {
        this.paises = paises;
        console.log(paises);
      }, (error) => {
        this.hayError = true;
        this.paises = [];
      }
      );
  }
}
