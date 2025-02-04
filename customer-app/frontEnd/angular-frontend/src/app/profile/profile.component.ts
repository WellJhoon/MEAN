import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = null; // Inicializamos como null para evitar problemas de acceso a propiedades antes de la carga
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (response) => {
        this.user = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar el perfil';
        this.isLoading = false;
        console.error('Error fetching user profile', error);
      },
    });
  }
}
