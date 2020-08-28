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
                "Content-Type": "text/html"
            })
        };
        return this.http.post<any>('/api/user', value, httpOptions);
        //return this.http.post<any>('/api/user',value, { headers }).pipe(tap(_ => console.log("received")));
    }

}
