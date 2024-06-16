import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CadastroProdutoComponent } from './components/cadastro-produto/cadastro-produto.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { VendasComponent } from './vendas/vendas.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'cadastro', component: CadastroComponent},
    { path: 'cadastroProduto', component: CadastroProdutoComponent},
    { path: 'produtos', component: ProdutosComponent},
    { path: 'vendas', component: VendasComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }