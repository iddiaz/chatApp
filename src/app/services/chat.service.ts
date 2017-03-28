import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Mensaje } from './../interfaces/mensaje.interface';

@Injectable()
export class ChatService {

  chats: FirebaseListObservable<any[]>;

  usuario: any = {
    nombre: 'Juan Carlos'
  };
 

  constructor( private af: AngularFire ) {
    // this.chats = af.database.list('/chats');
   }

   cargarMensajes() {
     // en documentación
    this.chats = this.af.database.list('chats', {
      query: {
        limitToLast: 20,
        orderByKey: true
      }
    });
    return this.chats;
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

   login() {

   }

   logOut() {
     
   }

}
