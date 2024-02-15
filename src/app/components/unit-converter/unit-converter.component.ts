import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FavComponent } from '../fav/fav.component';
import { Fav } from '../../models/fav.model';

@Component({
  selector: 'app-unit-converter',
  standalone: true,
  imports: [FormsModule, FavComponent],
  templateUrl: './unit-converter.component.html',
  styleUrl: './unit-converter.component.css'
})

export class UnitConverterComponent {
  conversion:string = ''
  datos:number = 0
  resultado:string = '0'
  medidaInicial:string = ''
  medidaFinal:string = ''
  listaFav:Fav[] = []

  comprobarTipoConversion(){
    const separarMedidas = this.conversion.split('-')
    this.medidaInicial = separarMedidas[0]
    this.medidaFinal = separarMedidas[1]
  }

  alternarConversion(){
    const separarMedidas = this.conversion.split('-')
    const alternarConversion = separarMedidas.reverse().join('-')
    this.conversion = alternarConversion
    this.medidaInicial = separarMedidas[0]
    this.medidaFinal = separarMedidas[1]
    this.conversionDatos()
  }

  conversionDatos(){   
    if(this.conversion == 'km-miles'){
      this.resultado = this.kmToMiles(this.datos).toFixed(2)
    } else if (this.conversion == 'miles-km'){
      this.resultado = this.milesToKm(this.datos).toFixed(2)
    } else if(this.conversion == 'feet-meters'){
      this.resultado = this.feetToMeters(this.datos).toFixed(2)
    } else if (this.conversion == 'meters-feet'){
      this.resultado = this.metersToFeet(this.datos).toFixed(2)
    } else if (this.conversion == 'centimeters-inches'){
      this.resultado = this.centimetersToInches(this.datos).toFixed(2)
    } else if (this.conversion == 'inches-centimeters'){
      this.resultado = this.inchesToCentimetres(this.datos).toFixed(2)
    }
  }

  kmToMiles(datos:number):number{
    return datos * 0.6213711922
  }

  milesToKm(datos:number):number{
    return datos * 1.609344
  }

  feetToMeters(datos:number):number{
    return datos * 0.3048
  }

  metersToFeet(datos:number):number{
    return datos * 3.280839895
  }

  centimetersToInches(datos:number):number{
    return datos * 0.3937007874
  }

  inchesToCentimetres(datos:number){
    return datos * 2.54
  }

  guardarFav(){
    let id = 1
    if(this.listaFav.length > 0){
      id = this.listaFav[this.listaFav.length - 1].id + 1
    }
    const nuevoFav = new Fav(id, (this.datos + ' ' + this.medidaInicial), (this.resultado + ' ' + this.medidaFinal))
    this.listaFav.push(nuevoFav)
    localStorage.setItem('listaFav', JSON.stringify(this.listaFav))
  }

  eliminarFav(id:number){
    for(let i=0; i<this.listaFav.length; i++){
      if(this.listaFav[i].id == id){
        this.listaFav.splice(i, 1)
      }
    }
    localStorage.setItem('listaFav', JSON.stringify(this.listaFav))
  }

  ngOnInit(){
    let listaFavLocal = localStorage.getItem('listaFav')
    let listaFav:Fav[]

    if(listaFavLocal != null){
      listaFav = JSON.parse(listaFavLocal)
    } else {
      listaFav = []
    }
    
    this.listaFav = listaFav
  }
}
