import {Component} from '@angular/core';
// @ts-ignore
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from './app.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private appService: AppService) {
    }

    title = 'angular-iot';
    message = '';
    history_data;
    public isVisible: boolean = false;

    userForm = new FormGroup({
        monitor: new FormControl('', Validators.nullValidator && Validators.required),
    });

    destroy$: Subject<boolean> = new Subject<boolean>();

    onSubmit(value) {
        console.log(value);
        this.appService.sendMSG(value).subscribe(data => {
            console.log('message:' + JSON.stringify(data));
            if (data) {
                this.message = data.message;
                if (data.message === 'LCD may not be online') {
                    this.userForm.reset();
                } else {
                    this.appService.add_data(value).subscribe(output => {
                    });
                    this.userForm.reset();
                }
            } else {
                console.log('data is null');
            }
        })
    }


    querySearch()
        :
        void {
        this.appService.query().subscribe(data => {
            console.log(JSON.stringify(data.data));
            var store = [];
            for (var i = 0; i < data.data.length; i++){
                store.push(data.data[i].history);
                console.log(store);
            }
                this.history_data = store;
            if (data === 'error') {
                this.message = "Trouble loading database";
                this.showAlert();
            }
        })
    }

    showAlert()
        :
        void {
        if (this.isVisible
        ) {
            return;
        }
        this.isVisible = true;
        setTimeout(() => this.isVisible = false, 2500)
    }

}
