import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  cadastroForm = new FormGroup({
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
  
  ngOnInit() {}

  onClick(){
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm);
    }
  }
  
  
}
