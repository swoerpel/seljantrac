import { createFeatureSelector, createSelector } from "@ngrx/store"
import { MaterialState } from '../material.reducer';

const materialFeatureState = createFeatureSelector<MaterialState>('material');

export const GetMaterials = createSelector(
    materialFeatureState,
    (state: MaterialState): any => state.materials
)