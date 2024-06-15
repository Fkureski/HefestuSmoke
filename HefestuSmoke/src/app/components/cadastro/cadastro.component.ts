import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers:[FirebaseService]
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
  });

  redirectToLogin = false;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {}

  onClick() {
    if (this.cadastroForm.valid) {
      this.firebaseService.createUser(this.cadastroForm.value)
        .then(() => {
          console.log('Usuário criado com sucesso');
          this.cadastroForm.reset();  // Redefine o formulário após o envio bem-sucedido
          this.cadastroForm.reset();  // Redefine o formulário após o envio bem-sucedido
          this.redirectToLogin = true; // Define a variável para controlar o redirecionamento
        })
        .catch((error) => {
          console.error('Erro ao criar usuário:', error);
          // Mostrar mensagem de erro
        });
    }
  }
}
