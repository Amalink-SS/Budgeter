import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
        {
            path: 'login',
            loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
        },
        {
            path: 'register',
            loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule)
        },
        {
            path: 'forgot-password',
            loadChildren: () => import('./forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordModule)
        },
        {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
        }
    ]
},
{
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
