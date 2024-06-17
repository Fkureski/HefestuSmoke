import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
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
      Validators.minLength(14),
      Validators.maxLength(14),
      Validators.pattern('^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}\\-[0-9]{2}$')
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

  errorMessage: string = '';

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit() {}

  onClick() {
    if (this.cadastroForm.valid) {
      const user = this.cadastroForm.value;
      const email = user.email;
      const cpf = user.cpf;
      const telefone = user.telefone;

      if (email && cpf && telefone) {
        this.firebaseService.verificarEmailExistente(email).subscribe((emailExiste: boolean) => {
          if (emailExiste) {
            this.errorMessage = 'Email já cadastrado';
          } else {
            this.firebaseService.verificarCpfExistente(cpf).subscribe((cpfExiste: boolean) => {
              if (cpfExiste) {
                this.errorMessage = 'CPF já cadastrado';
              } else {
                this.firebaseService.verificarTelefoneExistente(telefone).subscribe((telefoneExiste: boolean) => {
                  if (telefoneExiste) {
                    this.errorMessage = 'Telefone já cadastrado';
                  } else {
                    user.admin = false; // Certifique-se de que o campo admin é sempre falso
                    this.firebaseService.createUser(user)
                      .then(() => {
                        console.log('Usuário criado com sucesso');
                        this.cadastroForm.reset();
                        this.router.navigate(['/login']); // Redirecione para a página de login
                      })
                      .catch((error: any) => {
                        console.error('Erro ao criar usuário:', error);
                      });
                  }
                }, (error: any) => {
                  console.error('Erro ao verificar telefone existente:', error);
                });
              }
            }, (error: any) => {
              console.error('Erro ao verificar CPF existente:', error);
            });
          }
        }, (error: any) => {
          console.error('Erro ao verificar email existente:', error);
        });
      } else {
        console.error('Dados não fornecidos corretamente');
      }
    }
  }
}
