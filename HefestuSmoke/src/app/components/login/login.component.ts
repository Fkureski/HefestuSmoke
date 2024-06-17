import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { FormsModule } from '@angular/forms'; // Importe FormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  isAuthenticated: boolean = false;

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  // Função acionada quando o formulário de login é submetido
  onSubmit() {
    // Valida as credenciais do usuário usando o serviço Firebase
    this.firebaseService.validarUsuario(this.email, this.senha).subscribe(user => {
      if (user) {
        console.log('Usuário autenticado:', user);
        this.isAuthenticated = true;
        // Redireciona com base no papel do usuário (admin ou não-admin)
        if (user.admin) {
          this.router.navigate(['/produtos']); // Redireciona para a página de produtos para admin
        } else {
          this.router.navigate(['/vendas']); // Redireciona para a página de vendas para não-admin
        }
      } else {
        console.error('Email ou senha incorretos.');
        this.isAuthenticated = false;
      }
    }, error => {
      console.error('Erro ao validar usuário:', error);
      this.isAuthenticated = false;
    });
  }
}