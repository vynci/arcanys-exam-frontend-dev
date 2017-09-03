import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class InquiriesService {

	private headers = new Headers({'Content-Type': 'application/json'});
	// private endpoint = 'http://localhost:3000/v1/api/';
	private endpoint = 'https://arcanys-exam-rest.herokuapp.com/v1/api/';
	private url = this.endpoint + 'inquiries';
	private options = new RequestOptions({ headers: this.headers});

	constructor(private http: Http) { }

	getAll(){
		let options = new RequestOptions({ headers: this.headers});

		return this.http.get(this.url, options)
			.map((response: Response) => response.json());
	}

	create(data:any){
		let body = data;

		return this.http.post(this.url, JSON.stringify(body), {headers: this.headers})
		.map((response: Response) => response.json());
	}	

}
