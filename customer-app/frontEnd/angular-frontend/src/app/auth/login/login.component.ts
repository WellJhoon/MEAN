import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importa el módulo HttpClientModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule], // Aquí importas HttpClientModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.tokenService.setToken(response.token);
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Error during login', error);
      },
    });
  }
}
