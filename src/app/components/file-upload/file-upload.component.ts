import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { filter, finalize, first, last, map, tap } from 'rxjs/operators';
import { FileUpload } from 'src/app/shared/models/order-file.model';
import { FileApiService } from 'src/app/shared/services/file-upload-api.service';
import { uid } from 'uid';



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnChanges {

  @Input() files: FileUpload[] = [];
  @Output() uploadComplete: EventEmitter<FileUpload> = new EventEmitter<FileUpload>();
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();

  public uploadProgress$: Observable<number>;

  public displayProgressBar: boolean = false;

  public progress: number = 0;

  public fileFormControl: FormControl = new FormControl();

  constructor(
    private fileApiService: FileApiService,
  ) { }

  ngOnInit(): void {
  }


  ngOnChanges(){
    console.log("files",this.files)
    
    // this.displayProgressBar = true;
  }


  uploadFileClick(){
    this.fileFormControl.reset()
  }

  uploadFile(event){
    const file: File = event.target.files[0];
    if(!!file){
      this.displayProgressBar = true;
      const fileId = uid();
      const fileUpload: FileUpload = {
        id:fileId,
        name: file?.name,
        type: file.type,
        size: file.size,
      }
      const {uploadPercentage$, done$} = this.fileApiService.uploadFile(file,fileId);
      uploadPercentage$.subscribe((v: number)=>this.progress = v / 100);
      done$.pipe(
        last(),
        tap(()=>{
          this.uploadComplete.emit(fileUpload);
          this.displayProgressBar = false;
        })
      ).subscribe();
    }
  }

  deleteFile(fileUpload: FileUpload){
    this.fileApiService.deleteFile(fileUpload).pipe(
      first(),
      tap(() => this.remove.emit(fileUpload.id))
    ).subscribe();
  }


}
