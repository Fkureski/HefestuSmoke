import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CadastroService } from '../../services/cadastro.service';
import { ICadastro } from '../../models/common.model';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  cadastros: ICadastro[] = [];

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService
  ) {
    this.cadastroForm = this.fb.group({
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllCadastros();
  }

  getAllCadastros() {
    this.cadastroService
      .getAllCadastros()
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          this.cadastros = [];

          data.forEach((item) => {
            let cadastro = item.payload.toJSON() as ICadastro;

            this.cadastros.push({
              nome: cadastro.nome,
              cpf: cadastro.cpf,
              email: cadastro.email,
              dataNascimento: cadastro.dataNascimento,
              senha: cadastro.senha
            });
          });
        },
      });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value);
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }
}
