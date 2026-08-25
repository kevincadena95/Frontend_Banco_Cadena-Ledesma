import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Auth } from '../../service/auth';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);
  errorLogin = signal(false);

  formularioLogin = this.fb.group({
    usuario: ['', Validators.required],
    contraseña: ['', Validators.required],
  })

  ingresar() {
    if (this.formularioLogin.valid) {
      const user = this.formularioLogin.value.usuario;
      const password = this.formularioLogin.value.contraseña;

      const exito = this.auth.entrar(user!, password!);

      if (exito) {
        this.router.navigate(["mi-cuenta"]);
      } else {
        this.errorLogin.set(true);
      }
    }
  }

}