import {createAction, props} from '@ngrx/store';

export const CreateMaterial = createAction(
    '[Settings Page] Create Material',
    props<{name: string;}>(),
)

export const DeleteMaterial = createAction(
    '[Settings Page] Delete Material',
    props<{materialId: string;}>(),
)