import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { CreateOrderComponent } from './pages/create-order/create-order.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ViewOrderComponent } from './pages/view-order/view-order.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent, 
    canActivate: [LoggedInGuard]
  },
  {
    path: 'home/:order_id',
    component: ViewOrderComponent, 
    canActivate: [LoggedInGuard]
  },
  {
    path: 'create',
    component: CreateOrderComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [LoggedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
