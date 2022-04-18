import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {path: '', component: UserDashboardComponent,
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
