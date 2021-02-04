import { createFeatureSelector, createSelector } from "@ngrx/store"
import { FileState } from '../file.reducer';

const fileFeatureState = createFeatureSelector<FileState>('file');

// export const GetPercentage = createSelector(
//     fileFeatureState,
//     (state: FileState): any => state.percentage
// )