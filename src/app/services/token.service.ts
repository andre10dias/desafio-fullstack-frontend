import { Injectable } from '@angular/core';
import { UsuarioStorage } from '../models/usuario.storage';

const KEY_TOKEN = 'token';
const KEY_USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem(KEY_TOKEN, token);
  }

  saveUser(user: UsuarioStorage) {
    localStorage.setItem(KEY_USER, JSON.stringify(user));
  }

  deleteToken() {
    localStorage.removeItem(KEY_TOKEN);
  }

  deleteUser() {
    localStorage.removeItem(KEY_USER);
  }

  getToken() {
    return localStorage.getItem(KEY_TOKEN) ?? '';
  }

  getUserStorage() {
    return localStorage.getItem(KEY_USER) ?? '';
  }

  hasToken() {
    return !!this.getToken();
  }

}
