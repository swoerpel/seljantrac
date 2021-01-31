import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/User.model";
import { head, last} from 'lodash';
import { formatDate } from "@angular/common";
import { DEFAULT_LOCALE, SHORT_DATE_FORMAT } from "../constants/date.constants";

@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    constructor(
        private store: Store,
        private db: AngularFirestore,
    ){ }


}