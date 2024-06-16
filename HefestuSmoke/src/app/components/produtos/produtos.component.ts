import { Component, OnInit } from '@angular/core';
import { Database, ref, push, onValue, remove } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./produtos.component.scss']  // Atualize para SCSS
})
export class ProdutosComponent implements OnInit {
  produtos$: Observable<any[]>;
  produtos: any[] = [];

  constructor(private db: Database) {
    this.produtos$ = this.listar();
  }

  ngOnInit(): void {
    this.produtos$.subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  createProduto(produto: any) {
    const produtosRef = ref(this.db, 'produtos');
    return push(produtosRef, produto);
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
        observer.next(produtos);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  excluirProduto(key: string) {
    const produtoRef = ref(this.db, `produtos/${key}`);
    return remove(produtoRef);
  }

  editar(key: string) {
  }

  excluir(key: string) {
    this.excluirProduto(key).then(() => {
      console.log(`Produto com key: ${key} excluído`);
      this.produtos = this.produtos.filter(produto => produto.key !== key);
    }).catch(error => {
      console.error(`Erro ao excluir produto com key: ${key}`, error);
    });
  }
}
