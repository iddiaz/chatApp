import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Mensaje } from './../interfaces/mensaje.interface';

@Injectable()
export class ChatService {

  chats: FirebaseListObservable<any[]>;
 

  constructor( private af: AngularFire ) {
    // this.chats = af.database.list('/chats');
   }

   agregarMensaje( texto: string ) {
      let mensaje: Mensaje = {
        nombre: 'Juan Carlos',
        mensaje: texto
      }
      
      // Necesitamos saber si Firebase lo hizo bien o no, por lo que tenemos que retornarlo.
      // esto retorna una promesa no un observable.
      return this.chats.push( mensaje );
    
   }

}
