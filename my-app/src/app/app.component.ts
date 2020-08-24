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

    userForm = new FormGroup({
        monitor: new FormControl('', Validators.nullValidator && Validators.required),
    });

    destroy$: Subject<boolean> = new Subject<boolean>();

    onSubmit(value) {
        console.log(value);
        this.appService.sendMSG(value).pipe(takeUntil(this.destroy$)).subscribe(data => {
            console.log('message:', data);
            console.log(data);
            this.userForm.reset();
        });
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
