import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';
import { Material } from "src/app/shared/models/Material.model";
import { Order } from "src/app/shared/models/order.model";
import { MaterialApiService } from "src/app/shared/services/material-api.service";
import { MaterialApiActions, MaterialRouterActions } from "./actions";

@Injectable({
    providedIn: 'root'
})
export class MaterialEffects {
    constructor( 
        private actions$: Actions,
        private materialApiService: MaterialApiService,
    ){ 
 
    }

    init$ = createEffect(():any => {
        return this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            switchMap(() => [
                MaterialRouterActions.LoadMaterials(),
            ])
        );
    })


    loadMaterials$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(MaterialRouterActions.LoadMaterials),
            switchMap(() => {
                return this.materialApiService.loadMaterials().pipe(
                    map((Materials: Material[]) => MaterialApiActions.LoadMaterialsSuccess({Materials})),
                    catchError((err) => of(        MaterialApiActions.LoadMaterialsError({err})))
                )
            })
        )   
    });

}