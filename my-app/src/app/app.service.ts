import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) {
    }

    sendMSG(value: any) {
        console.log(value);
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.post<any>('/api/user', JSON.stringify(value), httpOptions);

    }
    query(){
        return this.http.get<any>('/api/query');
    }
    add_data(value: any){
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        };
        return this.http.post<any>('/api/add_data', JSON.stringify(value), httpOptions);
    }

}
