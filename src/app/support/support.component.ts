import { Component, OnInit } from '@angular/core';
import { ChatService }       from '../services/chat.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
  providers: [ChatService]
})
export class SupportComponent implements OnInit {

  public messages = [];
  public connection;
  public message;
  public isChatOnline:boolean = false;
  private chatModel:any = {
    type : '',
    sender : {},
    text : ''
  }

  public messageBoxes:Array<Object> = [];

  constructor(
    private _chatService : ChatService    
  ){}

  public sendChatMessage(recipientEmail:string):void{
    console.log('chat msg');
    var payload = {
      sender: 'Support',
      recipient: recipientEmail,
      type: 'new-message',
      text: this.message
    };

    this._chatService.sendMessage(payload);
    this.message = '';
    this.messages.push(payload);   
  }

  ngOnInit() {
    this.connection = this._chatService.getMessages('support').subscribe(message => {
      this.chatModel = message;

      if(this.chatModel.type === 'new-message'){
        this.messages.push(message);
      }else{
        this.messageBoxes.push({
          customerName : this.chatModel.sender.name,
          customerEmail : this.chatModel.sender.email
        });
      }
    });    
  }

}
