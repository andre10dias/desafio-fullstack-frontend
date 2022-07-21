import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  @Input() activeHome!: boolean;
  @Input() activeDashboard!: boolean;

  user$ = this.usuarioService.getUsuario();

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {

  }

  goHome() {
    this.router.navigate(['home']);
  }

  goDashboard() {
    this.router.navigate(['dashboard']);
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['']);
  }

}
