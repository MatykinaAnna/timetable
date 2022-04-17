import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {path: '', component: AdminDashboardComponent,
    children:[
      {path: 'settings', component: SettingsComponent},
      {
        path: 'home',
        loadChildren: () => import('./components/home/organizer/organizer.module')
          .then((m)=>m.OrganizerModule)
      },
      {path: '', redirectTo: 'home', pathMatch: 'full'},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
