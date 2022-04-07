import { EventEmitter,Injectable,Output } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Socket{
  @Output() outEven:EventEmitter<any>=new EventEmitter();

  constructor(private cookieService:CookieService){
    super({
      url:"http://localhost:4000",
      options:{
        query:{
          nameRoom:cookieService.get("Room")
        }
      }
    })
    this.getMensajes();
  }


  getMensajes=()=>{
    this.ioSocket.on('mensajes',data=>this.outEven.emit(data));
  }

  emitEvent=(mensajes)=>{
    this.ioSocket.emit('mensajes',mensajes);
    return this.getMensajes()
  }
}
