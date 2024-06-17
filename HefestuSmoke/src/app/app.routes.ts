import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CadastroProdutoComponent } from './components/cadastro-produto/cadastro-produto.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { VendasComponent } from './components/vendas/vendas.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { narguilesComponent } from './components/narguiles/narguiles.component';
import { EditarNovidadeComponent } from './components/editar-novidade/editar-novidade.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'cadastro', component: CadastroComponent},
    { path: 'cadastroProduto', component: CadastroProdutoComponent},
    { path: 'produtos', component: ProdutosComponent},
    { path: 'vendas', component: VendasComponent},
    { path: 'listaUsuarios', component: ListaUsuariosComponent},
    { path: 'narguiles', component: narguilesComponent},
    { path: 'listaNovidades', component: EditarNovidadeComponent}
];