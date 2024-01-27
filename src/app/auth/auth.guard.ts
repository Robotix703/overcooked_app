/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.userIsAuthenticated){
      return true;
    } else {
      this.authService.getAPIKey()
      .subscribe((result: boolean) => {
        if(!result){
          this.router.navigateByUrl('/auth');
        }
        return result;
      },
      (error: any) => {
        return this.router.navigateByUrl('/auth');
      });
    }
  }
}
