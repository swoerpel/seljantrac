import { createReducer, on } from "@ngrx/store";
import { FileActions } from "./actions";
import { uid } from "uid";
import { FileUpload, OrderFile } from "src/app/shared/models/order-file.model";
import { Observable, of } from "rxjs";

export interface FFile extends File {
    id: string;
}

export interface FileState {
    // Storing this means we have access to all files
    // if multiple file uploads
    fileUploads: FileUpload[];
}

const initialState: FileState = {
    fileUploads: [],
}

export const fileReducer = createReducer<FileState>(
    initialState,
    on(FileActions.RegisterFileUpload, (state, action): FileState => {
        return {
            ...state,
            fileUploads: [...state.fileUploads,action.fileUpload]
        }
    }),

);