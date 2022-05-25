import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Publicacion from './interfaces/publicacion';
import { getDatabase, ref, set } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  constructor(private firestore: Firestore) { }

  //añade una publicación a la base de datos
  addPublicacion(publicacion: Publicacion) {
    const pubRef = collection(this.firestore, 'publicaciones');
    return addDoc(pubRef, publicacion);
  }

  //elimina una publicación de la base de datos
  deletePublicacion(publicacion: Publicacion) {
    const pubRef = doc(this.firestore, `publicaciones/${publicacion.id}`);
    return deleteDoc(pubRef);
  }

  //obtiene todas las publicaciones de la base de datos
  getPublicaciones(): Observable<Publicacion[]> {
    const pubRef = collection(this.firestore, 'publicaciones');
    return collectionData(pubRef, {idField: 'id'}) as Observable<Publicacion[]>; 
  }
}