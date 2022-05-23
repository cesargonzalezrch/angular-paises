import { Component } from '@angular/core';
import { Country } from '../../interface/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
  li {
    cursor: pointer;
  }
  `]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = true;

  constructor(private paisService: PaisService) { }

  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(termino)
      .subscribe((paises) => {
        this.paises = paises;
      }, (error) => {
        this.hayError = true;
        this.paises = [];
      }
      );
  }

  sugerencias(termino: string) {
    this.hayError = true;
    this.termino = termino;
    this.paisService.buscarPais(termino)
      .subscribe(
        paises => this.paisesSugeridos = paises.splice(0, 5),
        paises => this.paisesSugeridos = []
      );
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }
}
