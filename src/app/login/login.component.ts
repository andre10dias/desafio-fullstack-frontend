import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { AutenticacaoService } from '../services/autenticacao.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string = '';
  senha: string = '';
  lembrarUsuario: boolean = false;

  constructor(
    private router: Router,
    private authService: AutenticacaoService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.isRemember();
    this.checkRemember();
    if (this.lembrarUsuario && this.tokenService.hasToken()) {
      this.router.navigate(['home']);
    }
  }

  loginSubmit() {
    const usuario: Usuario = {
      login: this.usuario,
      senha: this.senha,
      lembrar: this.lembrarUsuario
    };

    this.login(usuario);
  }

  login(usuario: Usuario){
    this.authService
    .autenticar(usuario)
    .subscribe({
      next: () => {
        this.router.navigate(['home']);
        console.log("Autenticado com sucesso");
      },
      error: (error) => {
        alert("Usuário ou senha inválido");
        console.log(error);
      }
    });
  }

  checkRemember() {
    let check = document.querySelector('#flexSwitch');
    this.lembrarUsuario = (check as HTMLInputElement).checked;
  }

  isRemember() {
    const check = document.querySelector('#flexSwitch');
    let user;

    if (this.tokenService.getUserStorage()) {
      user = JSON.parse(this.tokenService.getUserStorage());
    }

    if (user != undefined) {
      (check as HTMLInputElement).checked = user.lembrar;
    }

  }

}
