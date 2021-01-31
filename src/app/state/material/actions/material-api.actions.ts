import { createAction, props } from '@ngrx/store';
import { Material } from 'src/app/shared/models/material.model';

export const LoadMaterialsSuccess = createAction(
    '[Router] Load Materials Success',
    props<{Materials: Material[]}>()
)

export const LoadMaterialsError = createAction(
    '[Router] Load Materials Error',
    props<{err: any}>()
)