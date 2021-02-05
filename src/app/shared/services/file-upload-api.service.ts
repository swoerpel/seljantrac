import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


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
    const task = this.storage.upload(`/seljantrac/${fileId}`, file);
    return {
      uploadPercentage$: task.percentageChanges(),
      done$: task.snapshotChanges().pipe(
        finalize(() => {
          const fileRef = this.storage.refFromURL(`${this.FILE_PATH}`);
          return fileRef.getDownloadURL();
        }))
    };
    // // observe percentage changes
    // this.uploadPercent = task.percentageChanges();
  
    // this.uploadPercent.subscribe(console.log);
    // // get notified when the download URL is available
    // task.snapshotChanges().pipe(
    //     finalize(() => this.downloadURL = fileRef.getDownloadURL())
    // ).subscribe()
  }

  public getFileDownloadURL(): Observable<string>{
    return this.storage.ref('seljantrac/temp_text').getDownloadURL();
  }

  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }
}
