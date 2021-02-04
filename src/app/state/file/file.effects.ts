import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, takeUntil, tap } from "rxjs/operators";
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
    //         ofType(FileActions.UploadFile),
    //         map(a=>a.file),
    //         switchMap((file: File) => {
    //             console.log("FFFF",file)
    //             const {done$, uploadPercentage$} = this.fileApiService.uploadFile(file)
    //             uploadPercentage$.pipe(
    //                 tap((val)=>{
    //                     this.store.dispatch(FileActions.UploadFileProgress({val}))
    //                 }),
    //                 takeUntil(done$)
    //             ).subscribe();
    //             return of(FileActions.Default());
    //         })
    //     );
    // })



}