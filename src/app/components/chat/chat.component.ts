import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje: string = '';
  constructor( private chatService: ChatService ) { }

  ngOnInit() {
  }

  enviar() {
    if(this.mensaje.length === 0) {
      return;
    }
    
    // como el servicio devuelve una promesa:
    this.chatService.agregarMensaje( this.mensaje )
      .then( () => console.log('Hecho!') )
      .catch( (error) => console.log(error) );
      
  }

}
