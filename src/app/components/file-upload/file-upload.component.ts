import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { first, switchMap, tap } from 'rxjs/operators';
import { FileApiService } from 'src/app/shared/services/file-upload-api.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() files: any[] = [];
  @Output() upload: EventEmitter<File> = new EventEmitter<File>();
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();

  selectedFiles
  constructor() { }

  ngOnInit(): void {
  }

  uploadFile(event){
    this.selectedFiles = event.target.files;
    const file: File = event.target.files[0];
    this.upload.emit(file);
  }

  removeFile(event){
    console.log("remove",event)
    this.remove.emit();
  }



  // downloadFile(){
  //   this.fileApiService.getFileDownloadURL().pipe(
  //     first(),
  //     switchMap((downloadURL)=>this.fileApiService.download(downloadURL)),
  //     tap((blob)=>{
  //       console.log("blob",blob)
  //       const a = document.createElement('a')
  //       const objectUrl = URL.createObjectURL(blob)
  //       a.href = objectUrl
  //       a.download = 'archive';
  //       a.click();
  //       URL.revokeObjectURL(objectUrl);
  //     })
  //   ).subscribe();
  // }

}
