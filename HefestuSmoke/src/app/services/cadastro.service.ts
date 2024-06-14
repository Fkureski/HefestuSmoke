import {Injectable} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ICadastro } from '../models/common.model';

@Injectable({
    providedIn: 'root'
})
export class CadastroService {
    private dbPath = "/cadastro";
    cadastroRef: AngularFireList<any>;
    constructor (private db: AngularFireDatabase) {
        this.cadastroRef = db.list(this.dbPath)
    }

    getAllCadastros (){
        return this.cadastroRef;
    }

    getCadastro(key: string) {
        return this.db.object(`${this.dbPath}/${key}`);
    }

    addCadastro (cadastro: ICadastro) {
        this.cadastroRef.push(cadastro);
    }
    
}