import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [FirebaseService]
})
export class CadastroComponent implements OnInit {
  cadastroForm = new FormGroup({
    id: new FormControl<number>(0),
    nome: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[a-zA-Z ]*$')
    ]),
    cpf: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern('^[0-9]*$')
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    dataNascimento: new FormControl<Date>(new Date(), [
      Validators.required,
    ]),
    telefone: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern('^[0-9]*$')
    ]),
    senha: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    admin: new FormControl<boolean>(false)
  });

  redirectToLogin = false;

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit() {}

  onClick() {
    if (this.cadastroForm.valid) {
      const user = this.cadastroForm.value;
      user.admin = false; // Certifique-se de que o campo admin é sempre falso
      this.firebaseService.createUser(user)
        .then(() => {
          console.log('Usuário criado com sucesso');
          this.cadastroForm.reset();
          this.router.navigate(['/login']); // Redirecione para a página de login
        })
        .catch((error) => {
          console.error('Erro ao criar usuário:', error);
        });
    }
  }
}
