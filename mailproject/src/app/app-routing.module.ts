import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { GuardGuard } from './services/guard.guard';
import { ProductsComponent } from './products/products.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HousesComponent } from './houses/houses.component';
import { HouseDetailsComponent } from './house-details/house-details.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { CreateHousesComponent } from './create-houses/create-houses.component';
import { MyaddsComponent } from './myadds/myadds.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
  { path: 'signin', component: SigninComponent, data: { breadcrumb: 'sigin' } },
  // { path: '', component: HomeComponent },
  { path: '', component: LoginComponent },
  {
    path: 'product', component: ProductsComponent, canActivate: [GuardGuard],
    canActivateChild: [GuardGuard],
  },
  { path: 'contact', component: ContactsComponent },
  // { path: 'House', component: HousesComponent },
  { path: 'House', component: HousesComponent, canActivate: [GuardGuard], data: { breadcrumb: 'House' } },
  { path: 'House-Details', component: HouseDetailsComponent, canActivate: [GuardGuard], data: { breadcrumb: 'House-Details' } },
  { path: 'House-Details/:products', component: HouseDetailsComponent },
  { path: 'Favourite', component: FavouriteComponent },
  { path: 'create-House', component: CreateHousesComponent },
  { path: 'my-adds', component: MyaddsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
