import { Injectable, Provider } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthMethods, AuthProviders } from 'angularfire2';
import { Mensaje } from './../interfaces/mensaje.interface';

@Injectable()
export class ChatService {

  chats: FirebaseListObservable<any[]>;

  usuario: any = {};


  constructor(private af: AngularFire) {
    // this.chats = af.database.list('/chats');
    if(localStorage.getItem('usuario')){
      // Usuario logeado
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.usuario = null;
    }
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

  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      nombre: this.usuario.auth.displayName,
      mensaje: texto,
      uid: this.usuario.uid
    }

    // Necesitamos saber si Firebase lo hizo bien o no, por lo que tenemos que retornarlo.
    // esto retorna una promesa no un observable.
    return this.chats.push(mensaje);

  }

  login(proveedor: string) {
    
    let provider;

    if( proveedor === 'google') {
      provider = AuthProviders.Google;

    } else {
      provider = AuthProviders.Twitter;
    }

    this.af.auth.login({
      provider: provider,
      method: AuthMethods.Popup,
    }).then( data => {
      console.log(data);
      this.usuario = data;
      localStorage.setItem('usuario', JSON.stringify(data));
    })
  }

  logOut() {
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.af.auth.logout();
  }
}
