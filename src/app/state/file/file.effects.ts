import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, takeUntil, tap } from "rxjs/operators";
import { FileUpload } from "src/app/shared/models/order-file.model";
import { FileApiService } from "src/app/shared/services/file-upload-api.service";
import { FileActions } from "./actions";

@Injectable({
    providedIn: 'root'
})
export class FileEffects {
    constructor( 
        private actions$: Actions,
        private fileApiService: FileApiService,
        private store: Store,
    ){ 
 
    }

    // init$ = createEffect(():any => {
    //     return this.actions$.pipe(
    //         // ofType(FileActions.DeleteFile),
    //         // switchMap((fileUpload: FileUpload) => {
    //             // return of(FileActions.Default());
    //         // })
    //     );
    // })



}