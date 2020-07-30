import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DjangoHttpService } from './services/django-http.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { PayComponent } from './pages/pay/pay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatIconModule} from '@angular/material/icon';

import {MatDialogModule} from '@angular/material/dialog';
import { RoadsComponent } from './pages/roads/roads.component';
import { AssignAuthorityComponent } from './pages/assign-authority/assign-authority.component';
import { MinistryDashboardComponent } from './components/ministry-dashboard/ministry-dashboard.component';
import { AddAuthorityComponent } from './pages/add-authority/add-authority.component';
import { AuthorityDashboardComponent } from './components/authority-dashboard/authority-dashboard.component';
import { PlazaDashboardComponent } from './components/plaza-dashboard/plaza-dashboard.component';
import { BoothDashboardComponent } from './components/booth-dashboard/booth-dashboard.component';
import { AddPlazaComponent } from './pages/add-plaza/add-plaza.component';
import { AddBoothComponent } from './pages/add-booth/add-booth.component';
import { AddRatesComponent } from './pages/add-rates/add-rates.component';
import { CollectTollComponent } from './pages/collect-toll/collect-toll.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupPageComponent,
    LoginPageComponent,
    TestPageComponent,
    NavbarComponent,
    ProfileComponent,
    DashboardComponent,
    CustomerDashboardComponent,
    VehiclesComponent,
    PayComponent,
    RoadsComponent,
    AssignAuthorityComponent,
    MinistryDashboardComponent,
    AddAuthorityComponent,
    AuthorityDashboardComponent,
    PlazaDashboardComponent,
    BoothDashboardComponent,
    AddPlazaComponent,
    AddBoothComponent,
    AddRatesComponent,
    CollectTollComponent,
    FooterComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  providers: [DjangoHttpService, CookieService, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
