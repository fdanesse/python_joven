import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(public db: AngularFirestore, private storage: AngularFireStorage) { }

  getStorageDirectoryReference(path: string) { // Storage Dirpath Observer. FIXME: analizar
    return this.storage.storage.ref(path);
  }

  getCollection(path: string) { // Database collection observer.
    const collection$ = this.db.collection(path);
    return collection$.valueChanges();
  }

  getDocument(collectionName: string, documentName: string) { // Database Document Observer.
    const collection$ = this.db.collection(collectionName);
    const document: AngularFirestoreDocument<any> = collection$.doc(documentName);
    return document.valueChanges();
  }

}
