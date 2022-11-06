import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm: new FormControl('', [Validators.required])
  });

  public checkingUsername: boolean = false;

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private toastController: ToastController) { }

  ngOnInit() {
  }

  onSubmit():void {
    if(this.userForm.invalid || !this.passwordMatchValidator()) {
      return;
    }
    this.checkUsername().subscribe(exists => {
      if(!exists) {
        this.register();
      }
    });
  }

  register() {
    const {confirm, ...user} = this.userForm.value;
    this.authService.register(user).subscribe((res) => {
      this.presentToast('User registered', 'success');
    });
  }

  // It checks whether there is already another registered account with the same username
  public checkUsername(): Observable<boolean> {
    const exists$: Subject<boolean> = new Subject();
    if(this.userForm.get('username').valid) {
      this.checkingUsername = true;
      const username = this.userForm.get('username').value;
      // TODO: Remove delay, used only to test spinner
      this.userService.existsUser(username).pipe(delay(2002)).subscribe( exists => {
        this.checkingUsername = false;
        if(exists) {
          this.userForm.get('username').setErrors({userExists: true})
          exists$.next(true);
        } else {
          this.userForm.get('username').setErrors(null);
          exists$.next(false);
        }
      }, ()=> this.checkingUsername = false);
    }
    return exists$.asObservable();
  }

  private passwordMatchValidator() {
    if(this.userForm.get('password').value === this.userForm.get('confirm').value) {
      this.userForm.get('confirm').setErrors(null);
      return true;
    } else {
      this.userForm.get('confirm').setErrors({'mismatch': false});
      return false;
    }
 }

 async presentToast(message: string, type: 'danger' | 'success') {
  const toast = await this.toastController.create({
    message,
    duration: 1500,
    position: 'bottom',
    color: type
  });

  await toast.present();
}

}

