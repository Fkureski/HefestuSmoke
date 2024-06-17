import { Component, OnInit } from '@angular/core';
import { Database, ref, onValue, remove, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NovidadesService } from '../../services/novidades.service';
import { NavbarAdmComponent } from '../navbar-adm/navbar-adm.component';
@Component({
  selector: 'app-editar-novidade',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarAdmComponent],
  templateUrl: './editar-novidade.component.html',
  styleUrl: './editar-novidade.component.scss'
})
export class EditarNovidadeComponent {
  novidades$: Observable<any[]>;
  novidades: any[] = [];
  novidadeEditando: any = null;
  novidadeOriginal: any = null;

  constructor(private db: Database, private novidadesService: NovidadesService) {
    this.novidades$ = this.listarNovidades(); // Inicializa a lista de novidades
  }

  ngOnInit(): void {
    this.novidades$.subscribe(novidades => {
      this.novidades = novidades;
    });
  }

  listarNovidades(): Observable<any[]> {
    const novidadesRef = ref(this.db, 'novidades');
    return new Observable((observer) => {
      onValue(novidadesRef, (snapshot) => {
        const novidades: any[] = [];
        snapshot.forEach((childSnapshot) => {
          novidades.push({
            key: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        observer.next(novidades); // Emite a lista de novidades
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

  excluirNovidade(key: string) {
    const novidadeRef = ref(this.db, `novidades/${key}`);
    return remove(novidadeRef); // Remove uma novidade pelo key
  }

  editar(novidade: any) {
    this.novidadeEditando = { ...novidade }; // Copia a novidade a ser editada
    this.novidadeOriginal = { ...novidade }; // Guarda os valores originais da novidade
  }

  atualizarNovidade() {
    if (!this.novidadeEditando.key) {
      console.error('Novidade sem chave identificadora.');
      return;
    }

    const novidadeRef = ref(this.db, `novidades/${this.novidadeEditando.key}`);
    const novidadeAtualizada: any = {};

    // Adiciona ao objeto de atualização apenas os campos que foram modificados
    if (this.novidadeEditando.name !== this.novidadeOriginal.name) {
      novidadeAtualizada.name = this.novidadeEditando.name;
    }
    if (this.novidadeEditando.email !== this.novidadeOriginal.email) {
      novidadeAtualizada.email = this.novidadeEditando.email;
    }

    update(novidadeRef, novidadeAtualizada).then(() => {
      this.novidadeEditando = null; // Reseta a novidade em edição
      this.novidadeOriginal = null; // Reseta a novidade original
      window.location.reload(); // Recarrega a página
    }).catch(error => {
      console.error(`Erro ao atualizar novidade com key: ${this.novidadeEditando.key}`, error);
    });
  }

  excluir(key: string) {
    this.excluirNovidade(key).then(() => {
      this.novidades = this.novidades.filter(novidade => novidade.key !== key); // Atualiza a lista local de novidades
    }).catch(error => {
      console.error(`Erro ao excluir novidade com key: ${key}`, error);
    });
  }
}
