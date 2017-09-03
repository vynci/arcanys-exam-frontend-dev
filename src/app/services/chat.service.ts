import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class ChatService {
  private url = 'https://arcanys-exam-websockets.herokuapp.com/';  
  private socket;
  
  sendMessage(message:any){
    this.socket.emit('add-message', message);    
  }

  initUser(message:any){
    this.socket.emit('new-user', message);    
  }  
  
  getMessages(username:string) {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message/' + username, (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  

  disconnect(){
    this.socket.disconnect();
  }
}