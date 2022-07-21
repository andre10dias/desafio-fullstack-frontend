import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario.model';
import { UsuarioStorage } from '../models/usuario.storage';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  autenticar(user: Usuario): Observable<HttpResponse<any>> {
    return this.httpClient.post(`${API}/user/login`,
      {
        login: user.login,
        senha: user.senha
      },
      { observe: 'response' }
    ).pipe(
      tap((response) => {
        const authToken = response.headers.get('x-access-token') ?? '';

        const { body: loggedUser} = response;
        const userStorage = loggedUser as UsuarioStorage;
        userStorage.lembrar = user.lembrar;

        this.usuarioService.saveToken(authToken);
        this.usuarioService.saveUser(userStorage);
      })
    );
  }
}
