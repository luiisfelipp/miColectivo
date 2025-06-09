import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {

  usuario: any;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://localhost:3000/auth/perfil', { headers })
      .subscribe({
        next: (data: any) => {
          this.usuario = data;
        },
        error: (err) => {
          console.error('Error al obtener perfil', err);
        }
      });
  }
  logout() {
  this.authService.logout();
  this.router.navigate(['/home']);
}

}
