import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'meal',
    loadChildren: () => import('./meal/meal.module').then( m => m.MealPageModule)
  },
  {
    path: 'pantry/list',
    loadChildren: () => import('./pantry/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'pantry/create',
    loadChildren: () => import('./pantry/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'todoist/create',
    loadChildren: () => import('./todoist/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'todoist/list',
    loadChildren: () => import('./todoist/list/list.module').then( m => m.ListPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
