import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { UsuarioStorage } from '../models/usuario.storage';
import { Usuario } from '../models/usuario.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(
    private tokenService: TokenService
  ) {
    if (this.tokenService.hasToken()) {
      this.decodeJWT();
    }
  }

  private decodeJWT() {
    const token = this.tokenService.getToken();
    const usuario = jwt_decode(token) as Usuario;
    this.usuarioSubject.next(usuario);
  }

  getUsuario() {
    return this.usuarioSubject.asObservable();
  }

  saveToken(token: string) {
    this.tokenService.saveToken(token);
    this.decodeJWT();
  }

  saveUser(user: UsuarioStorage) {
    this.tokenService.saveUser(user);
    this.decodeJWT();
  }

  logout() {
    this.tokenService.deleteToken();
    this.tokenService.deleteUser();
    this.usuarioSubject.next({});
  }

  isLogado() {
    return this.tokenService.hasToken();
  }

}
