import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { head, last } from 'lodash';
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { uid } from "uid";
import { Material } from "../models/Material.model";


@Injectable({
    providedIn: 'root'
})
export class MaterialApiService {
    constructor(
        private store: Store,
        private db: AngularFirestore,
    ){ }

    public loadMaterials(): Observable<Material[]>{
        return from(this.db.collection<any>('materials').get()).pipe(
            map((res: any)=>res.docs.map((d)=>[d.id,d.data()])),
            map((mats:any[])=>mats.map((m)=>({...last(m),id:head(m)}))),
        )
    }

    public createMaterial(name: string): Observable<Material>{
        let id = uid(6);
        return from(
            this.db.collection<any>('materials')
                .doc(id)
                .set({name})
            ).pipe(map(_=>({id,name})))
    }

    public deleteMaterial(materialId: string): Observable<void>{
        return from(this.db.collection<any>('materials').doc(materialId).delete())
    }
}