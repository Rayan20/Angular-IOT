import {Component, OnDestroy} from '@angular/core';
// @ts-ignore
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from './app.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

    constructor(private appService: AppService) {
    }

    title = 'angular-iot';
    message = '';
    public isVisible: boolean = false;

    userForm = new FormGroup({
        monitor: new FormControl('', Validators.nullValidator && Validators.required),
    });

    destroy$: Subject<boolean> = new Subject<boolean>();

    onSubmit(value) {
        console.log(value);
        this.appService.sendMSG(value).pipe(takeUntil(this.destroy$)).subscribe(data => {
            console.log('message:', data);
            if (data === 500) {
                console.log(JSON.parse(data));
                this.message = "LCD may not be online";
                console.log(this.message);
            } else {
                this.message = "LCD updated"
            }
            this.userForm.reset();
        });
    }

    showAlert() : void {
        if (this.isVisible) {
            return;
        }
        this.isVisible = true;
        setTimeout(()=> this.isVisible = false,2500)
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
