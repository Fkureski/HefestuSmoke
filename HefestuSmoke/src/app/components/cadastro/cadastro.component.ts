import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent { 
  cadastroForm!: FormGroup;

  constructor (private fb: FormBuilder){
    this.cadastroForm = this.fb.group({
      nome: new FormControl ('', [Validators.required]),
      cpf: new FormControl ('', [Validators.required]),
      email: new FormControl ('', [Validators.required]),
      senha: new FormControl ('', [Validators.required]),
      dataNascimento: new FormControl ('', [Validators.required])
    })
  }

  onSubmit(){
    if (this.cadastroForm.valid){
      console.log(this.cadastroForm.value);
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }
  
 }
