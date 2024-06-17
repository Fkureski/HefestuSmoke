import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent implements OnInit {
  // Cria um FormGroup para o formulário de cadastro de produto com os campos e validações
  cadastroForm = new FormGroup({
    nomeProduto: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    descricao: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    marca: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    valor: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0.01)
    ]),
    quantidade: new FormControl<number | null>(null, [
      Validators.required,
    ]),
    imagemUrl: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('(https?://.*\.(?:png|jpg|jpeg|gif|svg|webp))') 
    ]),
  });

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {}

  // Função acionada quando o formulário é submetido
  onSubmit() {
    // Verifica se o formulário é válido
    if (this.cadastroForm.valid) {
      // Chama o serviço Firebase para criar o produto com os dados do formulário
      this.firebaseService.createProduto(this.cadastroForm.value)
        .then(() => {
          console.log('Produto criado com sucesso');
          this.cadastroForm.reset(); // Reseta o formulário após o sucesso
          alert("Produto salvo com sucesso");
        })
        .catch((error) => {
          console.error('Erro ao criar produto:', error);
          alert("Erro ao cadastrar produto");
        });
    }
  }
}