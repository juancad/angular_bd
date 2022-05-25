export default interface Publicacion {
    id?: string;
    nombre: string;
    contenido: string;
    imagen: string;
    //uid del usuario que ha creado la publicación
    uid: string;
}