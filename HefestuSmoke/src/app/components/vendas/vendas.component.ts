import { Component, OnInit } from '@angular/core';
import { Database, ref, push, onValue, remove, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {
  produtos$: Observable<any[]>;
  produtos: any[] = [];
  produtoSelecionado: any = null; // Produto selecionado ao abrir o modal
  isModalActive = false; // Adicionado para controlar o modal
  cartao = {
    nome: '',
    numero: '',
    validade: '',
    cvv: ''
  };

  constructor(private db: Database) {
    this.produtos$ = this.listar(); // Inicializa a lista de produtos
  }

  ngOnInit(): void {
    this.produtos$.subscribe(produtos => {
      this.produtos = produtos; // Atualiza a lista de produtos na inicialização
    });
  }

  createProduto(produto: any) {
    const produtosRef = ref(this.db, 'produtos');
    return push(produtosRef, produto); // Adiciona um novo produto
  }

  listar(): Observable<any[]> {
    const produtosRef = ref(this.db, 'produtos');
    return new Observable((observer) => {
      onValue(produtosRef, (snapshot) => {
        const produtos: any[] = [];
        snapshot.forEach((childSnapshot) => {
          produtos.push({
            key: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        observer.next(produtos); // Emite a lista de produtos
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  excluirProduto(key: string) {
    const produtoRef = ref(this.db, `produtos/${key}`);
    return remove(produtoRef); // Remove um produto
  }

  diminuir(produtoKey: string): void {
    const produtoIndex = this.produtos.findIndex(p => p.key === produtoKey);
    if (produtoIndex !== -1) {
      const produto = this.produtos[produtoIndex];
      if (produto.quantidade > 0) {
        produto.quantidade -= 1;
        if (produto.quantidade === 0) {
          this.excluir(produtoKey);
        } else {
          // Atualizar a quantidade no banco de dados
          const produtoRef = ref(this.db, `produtos/${produtoKey}`);
          update(produtoRef, { quantidade: produto.quantidade });
        }
      }
    }
  }

  excluir(key: string) {
    this.excluirProduto(key).then(() => {
      console.log(`Produto com key: ${key} excluído`);
      this.produtos = this.produtos.filter(produto => produto.key !== key); // Atualiza a lista local de produtos
    }).catch(error => {
      console.error(`Erro ao excluir produto com key: ${key}`, error);
    });
  }

  openModal(produto: any) {
    this.isModalActive = true;
    this.produtoSelecionado = produto;
    this.cartao = {
      nome: '',
      numero: '',
      validade: '',
      cvv: ''
    };
  }

  closeModal() {
    if (this.produtoSelecionado) {
      this.diminuir(this.produtoSelecionado.key);
    }
    this.isModalActive = false;
  }

  onSubmit() {
    if (this.isCartaoValido()) {
      alert('Compra Realizada!');
      this.closeModal();
    } else {
      console.error('Dados do cartão inválidos.');
      alert('Dados do cartão inválidos.');
    }
  }

  isCartaoValido(): boolean {
    const nomeValido = this.cartao.nome.trim() !== '';
    const numeroValido = /^[0-9]{16}$/.test(this.cartao.numero);
    const validadeValida = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(this.cartao.validade);
    const cvvValido = /^[0-9]{3,4}$/.test(this.cartao.cvv);

    return nomeValido && numeroValido && validadeValida && cvvValido;
  }
}
