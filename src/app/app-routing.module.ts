import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyComponent } from './company/company.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { UpdateCompanyComponent } from './update-company/update-company.component';
import {UpdateStockComponent} from './update-stock/update-stock.component';

const routes: Routes = [
  { path:'company', component:CompanyComponent },
  { path: 'company/:id', component: CompanyDetailComponent },  
  { path: 'update-company/:id', component: UpdateCompanyComponent },
  { path: 'add-company-stock/:id', component: UpdateStockComponent },
  { path: '', redirectTo: '/company', pathMatch: 'full' }, // redirect to company
  { path: '**', component: CompanyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
