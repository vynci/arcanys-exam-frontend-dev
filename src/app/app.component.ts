import { Component } from '@angular/core';
import { AddressService } from './services/address.service';
import { InquiriesService } from './services/inquiries.service';
import { ChatService }       from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AddressService, InquiriesService, ChatService]
})

export class AppComponent {

  constructor() { }
  
    ngOnInit() {
    }
  

}
