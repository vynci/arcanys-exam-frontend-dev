import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SocialMediaService {

	private headers = new Headers({'Content-Type': 'application/json'});
	// private endpoint = 'http://localhost:3000/v1/api/';
	private endpoint = 'https://arcanys-exam-rest.herokuapp.com/v1/api/';
	private url = this.endpoint + 'social-media';
	private options = new RequestOptions({ headers: this.headers});

	constructor(private http: Http) { }

	getAll(){
		let options = new RequestOptions({ headers: this.headers});

		return this.http.get(this.url, options)
			.map((response: Response) => response.json());
	}

	update(data:any){
		let body = data;
		var url = this.url + '/' + body._id;

		return this.http.put(url, JSON.stringify(body), {headers: this.headers})
		.map((response: Response) => response.json());
	}	

}
