import { Component, OnInit } from '@angular/core';
import { Database, ref, push, onValue, remove, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-narguiles',
  templateUrl: './narguiles.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavBarComponent],
  styleUrls: ['./narguiles.component.scss']
})
export class narguilesComponent implements OnInit {
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
}
