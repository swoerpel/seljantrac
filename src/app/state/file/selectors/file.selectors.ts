import { createFeatureSelector, createSelector } from "@ngrx/store"
import { FileUpload } from "src/app/shared/models/order-file.model";
import { FileState } from '../file.reducer';

const fileFeatureState = createFeatureSelector<FileState>('file');

export const GetFileUploads = createSelector(
    fileFeatureState,
    (state: FileState): FileUpload[] => state.fileUploads
)