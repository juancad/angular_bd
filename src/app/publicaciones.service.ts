import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc, deleteDoc, query, where, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Publicacion from './interfaces/publicacion';

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

  //modifica una publicación de la base de datos
  updatePublicacion(publicacion: Publicacion) {
    const pubRef = doc(this.firestore, `publicaciones/${publicacion.id}`);
    return updateDoc(pubRef, {
      "nombre": publicacion.nombre,
      "contenido": publicacion.contenido,
      "imagen": publicacion.imagen,
    });
  }

  //obtiene todas las publicaciones de la base de datos
  getPublicaciones(uid: string): Observable<Publicacion[]> {
    const pubRef = query(collection(this.firestore, "publicaciones"), where("uid", "==", uid));
    return collectionData(pubRef, { idField: 'id' }) as Observable<Publicacion[]>;
  }
}