import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fav',
  standalone: true,
  imports: [],
  templateUrl: './fav.component.html',
  styleUrl: './fav.component.css'
})

export class FavComponent {
  @Input() id!:number
  @Input() valorInicial!:string
  @Input() valorFinal!:string

  @Output() borrarID = new EventEmitter<number>()

  eliminarFav(id:number){
    this.borrarID.emit(id)
  }
}
