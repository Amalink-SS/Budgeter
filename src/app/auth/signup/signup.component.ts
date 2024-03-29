import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/constants';
import { AnimationService } from 'src/app/services/animation/animation.service';
import { AuthService } from '../services/auth/auth.service';

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (!control.parent || !control) {
      return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
      return null;
  }

  if (passwordConfirm.value === '') {
      return null;
  }

  if (password.value === passwordConfirm.value) {
      return null;
  }

  return {passwordsNotMatching: true};
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  showPassword = false;

    private registerForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.min(8), Validators.required]),
        passwordConfirm: new FormControl('', [Validators.min(8), Validators.required, confirmPasswordValidator])
    });

    constructor(
        private animationService: AnimationService,
        private authService: AuthService,
        private router: Router,
    ) {}

    doRegister(): void {
        this.authService.registerWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
            .then((response) => {
                return response !== null ? this.router.navigateByUrl(AppRoutes.TABS) : false;
            })
            .then((bool) => {
                bool ? console.log('Successfully Logged In') : console.log('Login Failed');
            }).catch(err => console.log(err));
    }

    ngOnInit(): void {
    }

    togglePasswordFieldType(): void {
        this.showPassword = !this.showPassword;
    }

    checkFieldValidity(control: string): void {
        // const cont = this.registerForm.controls[control]
    }

}
