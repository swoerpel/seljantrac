import { createReducer, on } from "@ngrx/store";
import { FileActions } from "./actions";
import { uid } from "uid";
import { OrderFile } from "src/app/shared/models/order-file.model";
import { Observable, of } from "rxjs";

export interface FFile extends File {
    id: string;
}

export interface FileState {
    // Storing this means we have access to all files
    // if multiple file uploads
    files: {[key:string]:string};
}

const initialState: FileState = {
    files: {},
}

export const fileReducer = createReducer<FileState>(
    initialState,
    on(FileActions.UploadFile, (state, action): FileState => {
        console.log('action in reducer',action)
        return {
            ...state,
            // files: {...state.files,[uid(4)]:action.file.name}
        }
    }),

);