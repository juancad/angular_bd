import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Publicacion from './interfaces/publicacion';


@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor(private firestore: Firestore) { }

  addPublicacion(publicacion: Publicacion) {
    const pubRef = collection(this.firestore, 'publicaciones');
    return addDoc(pubRef, publicacion);
  }

  getPublicaciones(): Observable<Publicacion[]> {
    const pubRef = collection(this.firestore, 'publicaciones');
    return collectionData(pubRef, {idField: 'id'}) as Observable<Publicacion[]>; 
  }

  deletePublicacion(publicacion: Publicacion) {
    const pubDocRef = doc(this.firestore, `publicaciones/${publicacion.id}`);
    return deleteDoc(pubDocRef);
  }
}