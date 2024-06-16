import { Component, Inject, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {
  produtos: any[] = [];

  constructor(@Inject(FirebaseService) private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getProdutos().subscribe((data: any[]) => {
      this.produtos = data;
    });
  }

  comprar(key: string): void {
    console.log('Produto comprado: ', key);
  }
}
