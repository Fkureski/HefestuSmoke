import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CadastroProdutoComponent } from './components/cadastro-produto/cadastro-produto.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'cadastro', component: CadastroComponent},
    { path: 'cadastroProduto', component: CadastroProdutoComponent}
];
