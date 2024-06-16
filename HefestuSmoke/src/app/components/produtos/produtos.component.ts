import { Component, OnInit } from '@angular/core';
import { Database, ref, push, onValue, remove, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importando FormsModule

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // Adicionando FormsModule
  styleUrls: ['./produtos.component.scss']  // Atualize para SCSS
})
export class ProdutosComponent implements OnInit {
  produtos$: Observable<any[]>;
  produtos: any[] = [];
  produtoEditando: any = null;
  produtoOriginal: any = null;

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
    return remove(produtoRef); // Remove um produto pelo key
  }

  editar(produto: any) {
    console.log("Editando produto:", produto); // Log para depuração
    this.produtoEditando = { ...produto }; // Copia o produto a ser editado
    this.produtoOriginal = { ...produto }; // Guarda os valores originais do produto
  }

  atualizarProduto() {
    if (!this.produtoEditando.key) {
      console.error('Produto sem chave identificadora.');
      return;
    }

    const produtoRef = ref(this.db, `produtos/${this.produtoEditando.key}`);
    const produtoAtualizado: any = {};

    // Adiciona ao objeto de atualização apenas os campos que foram modificados
    if (this.produtoEditando.nomeProduto !== this.produtoOriginal.nomeProduto) {
      produtoAtualizado.nomeProduto = this.produtoEditando.nomeProduto;
    }
    if (this.produtoEditando.imagemUrl !== this.produtoOriginal.imagemUrl) {
      produtoAtualizado.imagemUrl = this.produtoEditando.imagemUrl;
    }
    if (this.produtoEditando.valor !== this.produtoOriginal.valor) {
      produtoAtualizado.valor = this.produtoEditando.valor;
    }

    console.log("Atualizando produto:", produtoAtualizado); // Log para depuração

    update(produtoRef, produtoAtualizado).then(() => {
      console.log(`Produto com key: ${this.produtoEditando.key} atualizado`);
      this.produtoEditando = null; // Reseta o produto em edição
      this.produtoOriginal = null; // Reseta o produto original
      window.location.reload(); // Recarrega a página
    }).catch(error => {
      console.error(`Erro ao atualizar produto com key: ${this.produtoEditando.key}`, error);
    });
  }

  excluir(key: string) {
    this.excluirProduto(key).then(() => {
      console.log(`Produto com key: ${key} excluído`);
      this.produtos = this.produtos.filter(produto => produto.key !== key); // Atualiza a lista local de produtos
    }).catch(error => {
      console.error(`Erro ao excluir produto com key: ${key}`, error);
    });
  }
}
