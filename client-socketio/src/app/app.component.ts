import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { cesarService } from './cesar.service';
import { Observable } from 'rxjs';
import {FormData} from './form/data.model'
import { CyptoJsService } from './crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList:  string[] = [];
  obs : Observable<any>;
  key: number;
  message: string;
  keydes: string = 'Prova';


  constructor(private socketService: SocketService , private cesarService: cesarService, private cryptoService: CyptoJsService) {
  }
  setKey(keyinput : HTMLInputElement){
    this.key=Number(keyinput.value);
  }
  sendMessage(formData: FormData) {
    console.log("form input: " + JSON.stringify(formData));

    let encoded: FormData = formData; //Preparo una variabile da criptare
    switch (formData.messageType) {
      //Se il tipo di messaggio è cesar allora cripto con cesarService
      case "cesar":
        encoded.message = this.cesarService.encode(formData.message, this.key);
        break;
      //Se il tipo di messaggio è t-des allora cripto con cryptoService.encodeDes
      case "t-des":
        encoded.message = this.cryptoService.encodeDes(formData.message, this.keydes);
        break;
    }
    //Invio il messaggio cifrato
    this.socketService.sendMessage(JSON.stringify(encoded));

    this.message = "";
  }
  ngOnInit() {
    this.obs = this.socketService.getMessage();
    this.obs.subscribe(this.rcvMessage);
  }
  rcvMessage = (message: string) => {
    this.messageList.push("messagereceived: " + message + "  decodificato : " + this.cesarService.decode(message, this.key));
    console.log("--rcvMessage--")
  }
}
