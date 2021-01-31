import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { UserPageActions } from 'src/app/state/user/actions';
import { tap, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserSelectors } from 'src/app/state/user/selectors';
import { SnackbarErrorComponent } from 'src/app/components/error-snackbar/error-snackbar.component';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    public displayLogin = true;
    public providers = AuthProvider;

    public authFormGroup: FormGroup = new FormGroup({
        firstName: new FormControl('Steven',[
            Validators.required,
        ]),
        lastName: new FormControl('Woerpel',[
            Validators.required,
        ]),
        email: new FormControl('stetson@dreyfus.com',[
            Validators.required,
        ]),
        password: new FormControl('Stetson1',[
            Validators.required,
        ]),
        passwordRepeat: new FormControl('', [
            Validators.required,
        ]),
    });

    private displayStrings = {
        invalidEmail: 'Email is invalid',
        incorrectCredential: 'Email or Password is invalid',
        emailInUse: 'Email already being used',
        unknown: 'An error occured',
        weakPassword: 'password should be at least 6 characters',
        userNotFound: 'user not found',
        success: 'Success',
    }

    private unsubscribe: Subject<void> = new Subject();

    constructor(
        private snackBar: MatSnackBar,
        private store: Store,
    ) {}
    ngOnInit(){
        this.store.select(UserSelectors.GetLoginError).pipe(
            takeUntil(this.unsubscribe),
            filter(err => !!err),
            tap(err => this.displaySnackbar(err.code))
        ).subscribe();
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public toggleDisplay(){
        this.displayLogin = !this.displayLogin;
        this.authFormGroup.reset();
    }

    public onSubmit(){

        if(this.displayLogin){
            this.store.dispatch(UserPageActions.LoginUser({
                email: this.authFormGroup.controls.email?.value,
                password: this.authFormGroup.controls.password?.value
            }))
        }else{
            this.store.dispatch(UserPageActions.RegisterUser({
                firstName: this.authFormGroup.controls.firstName?.value,
                lastName: this.authFormGroup.controls.lastName?.value,
                email: this.authFormGroup.controls.email?.value,
                password: this.authFormGroup.controls.password?.value,
            }))
        }
    }

    private displaySnackbar(error_code) {
      let message = this.displayStrings.unknown;
      if(error_code === 'auth/invalid-email'){
          message = this.displayStrings.invalidEmail;
      }else if(error_code === 'auth/argument-error') {
          message = this.displayStrings.incorrectCredential;
      }else if(error_code === 'auth/wrong-password') {
          message = this.displayStrings.incorrectCredential;
      }else  if(error_code === 'auth/weak-password') {
          message = this.displayStrings.weakPassword;
      }else  if(error_code === 'auth/email-already-in-use') {
          message = this.displayStrings.emailInUse;
      }else  if(error_code === 'auth/user-not-found') {
          message = this.displayStrings.incorrectCredential;
      }else{
          message = this.displayStrings.success;
      }
      const snackBarRef = this.snackBar.openFromComponent(SnackbarErrorComponent,{
          data:{
              message: message,
              isSuccess: !error_code,
          }
      });
      setTimeout(() => snackBarRef.dismiss(), 2000);
    }
}