import {createAction, props} from '@ngrx/store';
import { Observable } from 'rxjs';
import { FileUpload } from 'src/app/shared/models/order-file.model';

export const RegisterFileUpload = createAction(
    '[File Upload] Register File Upload',
    props<{fileUpload: FileUpload}>()
)
export const ClearRegisteredFiles = createAction(
    '[File Upload] Clear Registered Files',
)

export const RemoveFileUpload = createAction(
    '[File Upload] Remove File Upload',
    props<{fileUpload: FileUpload}>()
)
