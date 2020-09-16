import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor() {}

  uploadTextFile(e): Observable<any> {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    return from(
      new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
      })
    );
  }

  uploadFile(e): Observable<any> {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return from(
      new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
      })
    );
  }

  downloadFile(fileName: string, fileType: string, data: string) {
    const blob = new Blob([data], { type: fileType });
    saveAs(blob, fileName);
  }
}
