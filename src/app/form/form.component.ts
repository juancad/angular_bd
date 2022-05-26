import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Publicacion from '../interfaces/publicacion';
import { PublicacionesService } from '../publicaciones.service';
import { getAuth } from "firebase/auth";
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  user = getAuth().currentUser;
  mensaje!: String;
  selectedFile!: File;
  downloadURL!: string;

  constructor(private publicacionesService: PublicacionesService, private fb: FormBuilder, private router: Router, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      contenido: [''],
      imagen: ['', [Validators.required]],
    })
  }

  async onSubmit() {
    console.log(this.form.value);
    //sube la imagen a la bd
    this.uploadImage();
    //guarda la publicación del formulario
    let publicacion: Publicacion = {
      nombre: this.form.value.nombre,
      contenido: this.form.value.contenido,
      imagen: this.downloadURL,
      uid: this.user?.uid!,
    }
    //añade la publicación en la bd
    const response = await this.publicacionesService.addPublicacion(publicacion);

    console.log(response);
  }

  selectImage(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    const filePath = `images/${this.user?.uid}/${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    //sube la imagen y guarda el url
    this.storage.upload(filePath, this.selectedFile).then(rst => {
      rst.ref.getDownloadURL().then(url => {
        this.downloadURL = url;
      })
    })
  }
}
