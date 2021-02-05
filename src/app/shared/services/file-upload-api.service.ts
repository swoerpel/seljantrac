import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { FileUpload } from '../models/order-file.model';


export interface FileUploadResponse {
  uploadPercentage$: Observable<any>;
  done$: Observable<any>
}

@Injectable({
  providedIn: 'root'
})
export class FileApiService {

  private FILE_PATH: string = 'gs://seljantrack.appspot.com/';
  
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  profileUrl: any;

  constructor(
    private storage: AngularFireStorage,
    private http: HttpClient
  ) {}

  uploadFile(file,fileId): FileUploadResponse {
    const upload$ = this.storage.upload(`/seljantrac/${fileId}`, file);
    return {
      uploadPercentage$: upload$.percentageChanges(),
      done$: upload$.snapshotChanges().pipe(
        finalize(() => {
          const fileRef = this.storage.refFromURL(`${this.FILE_PATH}`);
          return fileRef.getDownloadURL();
        }))
    };
  }

  deleteFile(fileUpload: FileUpload): Observable<void> {
    return this.storage.ref(`/seljantrac/${fileUpload.id}`).delete();
  }

  public download(fileUpload: FileUpload): Observable<any>{
    return this.storage.ref(`seljantrac/${fileUpload.id}`).getDownloadURL().pipe(
      switchMap((url)=> {
        return this.http.get(url, {
          responseType: 'blob'
        })
      })
    );
  }

}
