/* eslint-disable id-blacklist */
/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';

import { environment } from '../../environments/environment';

const URL_BACKEND = environment.apiURL;

export interface AuthResponseData {
  token: string;
  userId: string;
  expiresIn: string;
  number: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiKey!: string;
  private _userIsAuthenticated = false;

  constructor(private http: HttpClient) {}

  get apiKey(){
    return this._apiKey;
  }

  get userIsAuthenticated(){
    return this._userIsAuthenticated;
  }

  public saveAPIKey(apiKey: string): Promise<void>{
    this._apiKey = apiKey;
    this._userIsAuthenticated = true;
    return Preferences.set({ key: 'apiKey', value: apiKey });
  }

  public login(apiKey: string): Observable<Boolean>{
    return this.http.post<Boolean>(URL_BACKEND + 'login', {apiKey: apiKey});
  }

  getAPIKey(): Observable<boolean>{
    return from(Preferences.get({ key: 'apiKey' })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return false;
        }

        this._apiKey = storedData.value;
        return true;
      })
    );
  }
}
