import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { UploadTask } from './upload-task';

@Injectable()
export class FileStorageService {

  constructor(private afso: AngularFireStorage) { }

  upload(path: string, file: File): UploadTask {
    const task = this.afso.upload(path, file);
    return {downloadUrl: task.downloadURL()};
  }


  downloadUrlProfile(uid: string): Observable<any> {
    return this.afso.ref('profile-images/' + uid).getDownloadURL();

  }

}
