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

export const CreateMaterialSuccess = createAction(
    '[Router] Create Material Success',
    props<{material: Material}>()
)

export const CreateMaterialError = createAction(
    '[Router] Create Material Error',
    props<{err: any}>()
)

export const DeleteMaterialSuccess = createAction(
    '[Router] Delete Material Success',
    props<{materialId: string}>()
)

export const DeleteMaterialError = createAction(
    '[Router] Delete Material Error',
    props<{err: any}>()
)