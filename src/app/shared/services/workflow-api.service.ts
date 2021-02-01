import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { from, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Workflow } from "../models/Workflow.model";
import { head, last} from 'lodash';
import { formatDate } from "@angular/common";
import { DEFAULT_LOCALE, SHORT_DATE_FORMAT } from "../constants/date.constants";
import { uid } from 'uid';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class WorkflowApiService {
    constructor(
        private db: AngularFirestore,
    ){
    }

    public loadWorkflows(): Observable<Workflow[]>{
        return of([]);
        // return from(this.db.collection<any>('Workflows').get()).pipe(
    }


}