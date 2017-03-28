import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje: string = '';
  elemento: any;

  constructor( private chatService: ChatService ) { 
   
    this.chatService.cargarMensajes()
      .subscribe( () => {
        // console.log('mensajaes cargados...');
        setTimeout(()=> this.elemento.scrollTop = this.elemento.scrollHeight, 100)
        
      });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar() {
    if(this.mensaje.length === 0) {
      return;
    }
    
    // como el servicio devuelve una promesa:
    this.chatService.agregarMensaje( this.mensaje )
      .then( () => {
        console.log('Hecho!')
        this.mensaje = '';

      } )

      .catch( (error) => console.log(error) );
      
  }

}
