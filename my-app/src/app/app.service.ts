import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) {
    }

    sendMSG(value: any) {
        console.log(value);
        const headers = {'Content-Type':'application/json'};
        return this.http.post<any>('/api/user', value, { headers });
    }

}
