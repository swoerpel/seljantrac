import { createReducer, on } from "@ngrx/store";
import { Material } from "src/app/shared/models/material.model";
import { MaterialApiActions, MaterialRouterActions } from "./actions";

export interface MaterialState {
    materials: Material[];
    error: any;
}

const initialState: MaterialState = {
    materials: [],
    error: null,
}

export const materialReducer = createReducer<MaterialState>(
    initialState,
    on(MaterialApiActions.LoadMaterialsSuccess, (state, action): MaterialState => {
        return {
            ...state,
            materials: action.Materials,
            error: null,
        }
    }),
    on(MaterialApiActions.LoadMaterialsError, (state, action): MaterialState => {
        return {
            ...state,
            error: action.err,
        }
    }),

    on(MaterialRouterActions.LoadMaterials, (state, action): MaterialState => {
        return {
            ...state,
            error: null
        }
    }),
);