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
    loadChildren: () => import('./meal/meal.module').then( m => m.MealPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'pantry/list',
    loadChildren: () => import('./pantry/list/list.module').then( m => m.ListPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'pantry/create',
    loadChildren: () => import('./pantry/create/create.module').then( m => m.CreatePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'todoist/list',
    loadChildren: () => import('./todoist/list/list.module').then( m => m.ListPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'recipe/view/:recipeId',
    loadChildren: () => import('./recipe/view/view.module').then( m => m.ViewPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'recipe/follow/:recipeId',
    loadChildren: () => import('./recipe/follow/follow.module').then( m => m.FollowPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
