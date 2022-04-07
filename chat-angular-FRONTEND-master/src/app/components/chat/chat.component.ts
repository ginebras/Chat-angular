import { Component, OnInit } from '@angular/core';
import {SocketWebService} from '../../services/socket-web.service';
import {Usuario} from '../../modelo/usuario';
import { CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  public usuarios:Usuario[]=[];
  public usuario:Usuario=new Usuario("","");
  public nombreOk:boolean;

  constructor(private _socketWebService:SocketWebService,private _cookieService:CookieService){
    this.nombreOk=false;
  }

  ngOnInit(){
    this.getMensajes()
  }

  getMensajes(){
    this._socketWebService.outEven.subscribe(response=>{
      this.usuarios=response
    });
  }

  handleMensajes(){
    this._socketWebService.emitEvent(this.usuario)
    this.nombreOk=true;
  }
}
