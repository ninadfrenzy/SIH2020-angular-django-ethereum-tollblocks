import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CustomerAuthGuardService } from './services/customer-auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VehiclesComponent } from './pages/vehicles/vehicles.component';
import { PayComponent } from './pages/pay/pay.component';
import { RoadsComponent } from './pages/roads/roads.component';
import { AssignAuthorityComponent } from './pages/assign-authority/assign-authority.component';
import { MinistryAuthGuardService } from './services/ministry-auth-guard.service';
import { GenericAuthGuardService } from './services/generic-auth-guard.service';
import { AddAuthorityComponent } from './pages/add-authority/add-authority.component';
import { AddPlazaComponent } from './pages/add-plaza/add-plaza.component';
import { AuthorityAuthGuardService } from './services/authority-auth-guard.service';
import { AddBoothComponent } from './pages/add-booth/add-booth.component';
import { PlazaAuthGuardService } from './services/plaza-auth-guard.service';
import { AddRatesComponent } from './pages/add-rates/add-rates.component';
import { CollectTollComponent } from './pages/collect-toll/collect-toll.component';
import { BoothAuthGuardService } from './services/booth-auth-guard.service';
import { BlockchainDashboardComponent } from './pages/blockchain-dashboard/blockchain-dashboard.component';


const routes: Routes = [
  {
    path: 'signup',
    component: SignupPageComponent
  },
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'test',
    component: TestPageComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [CustomerAuthGuardService],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GenericAuthGuardService],
  },
  {
    path: 'vehicles',
    component: VehiclesComponent,
    canActivate: [CustomerAuthGuardService],
  },
  {
    path: 'pay',
    component: PayComponent,
    canActivate: [CustomerAuthGuardService],
  },
  {
    path: 'addroads',
    component: RoadsComponent,
    canActivate: [MinistryAuthGuardService],
  },
  {
    path: 'assignauthority',
    component: AssignAuthorityComponent,
    canActivate: [MinistryAuthGuardService],
  },
  {
    path: 'addauthority',
    component: AddAuthorityComponent,
    canActivate: [MinistryAuthGuardService],
  },
  {
    path: 'addplaza',
    component: AddPlazaComponent,
    canActivate: [AuthorityAuthGuardService],
  },
  {
    path: 'addbooth',
    component: AddBoothComponent,
    canActivate: [PlazaAuthGuardService],
  },
  {
    path: 'addrates',
    component: AddRatesComponent,
    canActivate: [PlazaAuthGuardService],
  },
  {
    path: 'collect-toll',
    component: CollectTollComponent,
    canActivate: [BoothAuthGuardService],
  },
  {
    path: 'block-dash',
    component: BlockchainDashboardComponent,
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
