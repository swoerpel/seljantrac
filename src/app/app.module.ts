import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HeaderComponent } from './layout/header/header.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { StoreModule } from '@ngrx/store';

import { orderReducer } from './state/order/order.reducer';
import { OrderEffects } from './state/order/order.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { environment } from 'src/environments/environment';
import { CreateOrderComponent } from './pages/create-order/create-order.component';
import { MaterialModule } from './shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { customerReducer } from './state/customer/customer.reducer';
import { CustomerEffects } from './state/customer/customer.effects';
import { materialReducer } from './state/material/material.reducer';
import { MaterialEffects } from './state/material/material.effects';
import { userReducer } from './state/user/user.reducer';
import { UserEffects } from './state/user/user.effects';
import { LoginComponent } from './pages/login/login.component';
import { SnackbarErrorComponent } from './components/error-snackbar/error-snackbar.component';

const stateSlices = {
  user: userReducer,
  order: orderReducer,
  customer: customerReducer,
  material: materialReducer,
}

const stateEffects = [
  UserEffects,
  OrderEffects,
  CustomerEffects,
  MaterialEffects
]



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateOrderComponent,
    SettingsComponent,
    HeaderComponent,
    ItemListComponent,
    CreateOrderComponent,
    LoginComponent,
    SnackbarErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxAuthFirebaseUIModule.forRoot(environment.firebase,() => 'seljantrac_factory',environment.firebase_auth),
    StoreModule.forRoot(stateSlices),
    EffectsModule.forRoot(stateEffects),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'seljantrac',
      maxAge: 25,
    }),
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
