import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { SocketService } from './socket.service';
import { cesarService } from './cesar.service';
import { CryptoService } from './crypto.service';

const config: SocketIoConfig = { url: 'https://3000-green-cattle-2kgayt5g.ws-eu03.gitpod.io/', options: {/*transport : ['websocket'], withCredentials:false*/} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [SocketService, cesarService, CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
