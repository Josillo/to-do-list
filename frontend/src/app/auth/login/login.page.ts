import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService, 
    private toastController: ToastController) { }

  ngOnInit() {
  }

  onSubmit():void {
    if(this.userForm.invalid) {
      return;
    }
      this.login();
  }

  login(){
    const user = this.userForm.value;
    
    this.authService.login(user).subscribe((res)=>{
      if(!res.access_token) {
        this.presentToast('Invalid credentials', 'danger');
        return;
      }
    }, err => {
      this.presentToast('Invalid credentials', 'danger');
    });
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
