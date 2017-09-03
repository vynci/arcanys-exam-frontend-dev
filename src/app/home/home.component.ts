import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';
import { InquiriesService } from '../services/inquiries.service';
import { SocialMediaService } from '../services/socialMedia.service';
import { ChatService }       from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AddressService, InquiriesService, ChatService, SocialMediaService]
})
export class HomeComponent implements OnInit {

  public messages = [];
  public connection;
  public message;
  public isChatOnline:boolean = false;
  public isPostDisconnection:boolean = false;

  public offices:Array<Object> = [];
  public inquiries:Array<Object> = [];
  public socialMedias:any = {
    facebook : '',
    twitter: '',
    instagram: ''
  }
  public isAddOffice:boolean = false;
  public isAdmin:boolean = false;

  public searchFilter:any = {
    city : ''
  };

  public socialMediaSettings:any = {
    facebook : {
      id : '',
      name : ''
    },
    twitter:  {
      id : '',
      name : ''
    },
    instagram:  {
      id : '',
      name : ''
    }
  }

  public newUser:any = {
    email: '',
    name: ''
  }

  public newOffice:any = {
    name : '',
    city : '',
    address1 : '',
    address2 : '',
    phone1 : '',
    phone2 : ''
  }

  public newInquiry:any = {
    fullName: '',
    email : '',
    phone : '',
    inquiryType : '',
    message : ''
  }

  constructor(
    private _addressService : AddressService,
    private _inquiriesService : InquiriesService,
    private _socialMediaService : SocialMediaService,
    private _chatService : ChatService    
  ){}

	private fetchOffices():void{
		this._addressService.getAll()
		.subscribe(data => {
      this.offices = data.data;
		});
  }

	private fetchInquries():void{
		this._inquiriesService.getAll()
		.subscribe(data => {
      this.inquiries = data.data;
		});
  } 
  
  private fetchSocialMedia():void{
		this._socialMediaService.getAll()
		.subscribe(data => {
      data.data.forEach(obj => {
        this.socialMedias[obj.type.toLowerCase()] = obj.name;
        this.socialMediaSettings[obj.type.toLowerCase()] = {
          _id : obj._id,
          name : obj.name
        };
      });
    
		});
  } 
  
  public switchUser(type:string):void{
    if(type === 'admin'){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }

  public addOffice():void{
    this.isAddOffice = true;
  }

  public cancelAddOffice():void{
    this.isAddOffice = false;
    this.clearOfficeForm();
  }

  public clearOfficeForm():void{
    this.newOffice = {
      name : '',
      city : '',
      address1 : '',
      address2 : '',
      phone1 : '',
      phone2 : ''
    }    
  }

  public clearInquiryForm():void{
    this.newInquiry = {
      fullName: '',
      email : '',
      phone : '',
      inquiryType : '',
      message : ''
    }  
  }  

  public editOffice(office:any):void{
		this._addressService.update(office)
		.subscribe(data => {      
      this.clearOfficeForm();
      this.fetchOffices();      
		});    
  }  

  public deleteOffice(office:any):void{
		this._addressService.delete(office._id)
		.subscribe(data => {      
      this.clearOfficeForm();
      this.fetchOffices();      
		});
  }  

  public saveOffice():void{
		this._addressService.create(this.newOffice)
		.subscribe(data => {
      this.fetchOffices();
      this.clearOfficeForm();
		});    
  }

  public saveSocialMedia():void{
    console.log(this.socialMediaSettings);
    // For Facebook
    this._socialMediaService.update(this.socialMediaSettings.facebook)
		.subscribe(data => {
      this.fetchSocialMedia();
    });
    // For Twitter
    this._socialMediaService.update(this.socialMediaSettings.twitter)
		.subscribe(data => {
      this.fetchSocialMedia();
    }); 
    // For Instagram
    this._socialMediaService.update(this.socialMediaSettings.instagram)
		.subscribe(data => {
      this.fetchSocialMedia();
		}); 
  }  

  public submitInquiry():void{
		this._inquiriesService.create(this.newInquiry)
		.subscribe(data => {
      this.fetchInquries();
      this.clearInquiryForm();
      alert('Inquiry Submitted! Thank You :)');
		});      
  }

  public startChat():void{    
    this.isChatOnline = true;

    this.connection = this._chatService.getMessages(this.newUser.email).subscribe(message => {
      this.messages.push(message);
    });
    
    this._chatService.initUser({
      email : this.newUser.email,
      name: this.newUser.name
    });
  }

  public disconnectChat():void{    
    this.isChatOnline = false;

    this._chatService.disconnect();
    this.connection.unsubscribe();
    this.messages = [];
    this.isPostDisconnection = true;
  }  
  
  public sendChatMessage():void{
    var payload = {
      sender: this.newUser.name,
      recipient: 'support',
      type: 'new-message',
      text: this.message
    };

    this._chatService.sendMessage(payload);
    this.message = '';
    this.messages.push(payload);   
  }  
  
	ngOnInit(): void {
    this.fetchInquries();
    this.fetchOffices();  
    this.fetchSocialMedia();
  }

  ngOnDestroy() {
    if(this.connection){
      this.connection.unsubscribe();
    }
    
  }      

}
