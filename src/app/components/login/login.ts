import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

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
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ingresar() {
    if (this.formularioLogin.invalid) {
      return;
    }

    const email = this.formularioLogin.value.email!;
    const password = this.formularioLogin.value.password!;

    this.auth.login(email, password).subscribe({

      next: (respuesta) => {
        console.log('Login exitoso:', respuesta);
        this.errorLogin.set(false);
        this.router.navigate(['/dashboard']);
      },
      
      error: (error) => {
        console.error('Error en el login:', error);
        this.errorLogin.set(true);
      }

    });
  }
}