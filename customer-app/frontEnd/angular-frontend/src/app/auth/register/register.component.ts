import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userData = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    numero: '',
  };

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.userData).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso. Redirigiendo al login...';
        this.errorMessage = null;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = 'El usuario ya está registrado.';
        } else {
          this.errorMessage = 'Error al registrar. Inténtalo de nuevo.';
        }
        this.successMessage = null;
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
