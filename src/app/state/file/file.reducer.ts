import { createReducer, on } from "@ngrx/store";
import { FileActions } from "./actions";
import { uid } from "uid";
import { FileUpload, OrderFile } from "src/app/shared/models/order-file.model";
import { Observable, of } from "rxjs";



// The initial purpose of this state slice is to hold file data
// before an order (and orderId) have been created
// on create, these files get assigned to the order and cleared
// from temporary storage


export interface FileState {
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
    on(FileActions.RemoveFileUpload, (state, action): FileState => {
        return {
            ...state,
            fileUploads: state.fileUploads.filter((fi: FileUpload)=>fi.id === action.fileUpload.id)
        }
    }),

);