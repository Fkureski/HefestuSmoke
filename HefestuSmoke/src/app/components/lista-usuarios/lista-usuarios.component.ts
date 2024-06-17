import { Component, OnInit } from '@angular/core';
import { Database, ref, push, onValue, remove, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { NavbarAdmComponent } from '../navbar-adm/navbar-adm.component';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarAdmComponent],
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios$: Observable<any[]>;
  usuarios: any[] = [];
  usuarioEditando: any = null;
  usuarioOriginal: any = null;

  constructor(private db: Database, private firebaseService: FirebaseService) {
    this.usuarios$ = this.listarUsuarios(); // Inicializa a lista de usuários
  }

  ngOnInit(): void {
    this.usuarios$.subscribe(usuarios => {
      this.usuarios = usuarios.filter(user => user.nome !== 'admin'); // Exclui o usuário admin
    });
  }

  listarUsuarios(): Observable<any[]> {
    const usuariosRef = ref(this.db, 'users');
    return new Observable((observer) => {
      onValue(usuariosRef, (snapshot) => {
        const usuarios: any[] = [];
        snapshot.forEach((childSnapshot) => {
          usuarios.push({
            key: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        observer.next(usuarios); // Emite a lista de usuários
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  excluirUsuario(key: string) {
    const usuarioRef = ref(this.db, `users/${key}`);
    return remove(usuarioRef); // Remove um usuário pelo key
  }

  editar(usuario: any) {
    this.usuarioEditando = { ...usuario }; // Copia o usuário a ser editado
    this.usuarioOriginal = { ...usuario }; // Guarda os valores originais do usuário
  }

  atualizarUsuario() {
    if (!this.usuarioEditando.key) {
      console.error('Usuário sem chave identificadora.');
      return;
    }

    const usuarioRef = ref(this.db, `users/${this.usuarioEditando.key}`);
    const usuarioAtualizado: any = {};

    // Adiciona ao objeto de atualização apenas os campos que foram modificados
    if (this.usuarioEditando.nome !== this.usuarioOriginal.nome) {
      usuarioAtualizado.nome = this.usuarioEditando.nome;
    }
    if (this.usuarioEditando.cpf !== this.usuarioOriginal.cpf) {
      usuarioAtualizado.cpf = this.usuarioEditando.cpf;
    }
    if (this.usuarioEditando.email !== this.usuarioOriginal.email) {
      usuarioAtualizado.email = this.usuarioEditando.email;
    }
    if (this.usuarioEditando.senha !== this.usuarioOriginal.senha) {
      usuarioAtualizado.senha = this.usuarioEditando.senha;
    }
    if (this.usuarioEditando.dataNascimento !== this.usuarioOriginal.dataNascimento) {
      usuarioAtualizado.dataNascimento = this.usuarioEditando.dataNascimento;
    }
    if (this.usuarioEditando.telefone !== this.usuarioOriginal.telefone) {
      usuarioAtualizado.telefone = this.usuarioEditando.telefone;
    }

    update(usuarioRef, usuarioAtualizado).then(() => {
      this.usuarioEditando = null; // Reseta o usuário em edição
      this.usuarioOriginal = null; // Reseta o usuário original
      window.location.reload(); // Recarrega a página
    }).catch(error => {
      console.error(`Erro ao atualizar usuário com key: ${this.usuarioEditando.key}`, error);
    });
  }

  excluir(key: string) {
    this.excluirUsuario(key).then(() => {
      this.usuarios = this.usuarios.filter(usuario => usuario.key !== key); // Atualiza a lista local de usuários
    }).catch(error => {
      console.error(`Erro ao excluir usuário com key: ${key}`, error);
    });
  }
}
