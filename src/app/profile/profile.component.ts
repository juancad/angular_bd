import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  user = getAuth().currentUser;
  selectedFile!: File;
  downloadURL!: string;
  isSelected = false;
  mensaje_img!: String;
  mensaje_profile!: String;

  constructor(private fb: FormBuilder, private router: Router, private location: Location, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [this.user?.displayName, [Validators.required, Validators.maxLength(50)]],
      email: [this.user?.email, [Validators.required, Validators.email]],
      imagen: [this.user?.photoURL],
    })
  }

  saveProfile() {
    if (this.selectedFile != null) {
      updateProfile(this.user!, {
        displayName: this.form.value.nombre, photoURL: this.downloadURL.toString()
      }).then(() => {
        this.mensaje_profile = "Se ha actualizado correctamente el perfil.";
      }).catch((error) => {
        this.mensaje_profile = "No se ha podido actualizar correctamente el perfil."
      });
      updateEmail(this.user!, this.form.value.email).then(() => {
        this.mensaje_profile = "Se ha actualizado correctamente el perfil.";
      }).catch((error) => {
        this.mensaje_profile = "No se ha podido actualizar correctamente el perfil."
      });
    }
    else {
      updateProfile(this.user!, {
        displayName: this.form.value.nombre,
      }).then(() => {
        this.mensaje_profile = "Se ha actualizado correctamente el perfil.";
      }).catch((error) => {
        this.mensaje_profile = "No se ha podido actualizar correctamente el perfil."
      });
      updateEmail(this.user!, this.form.value.email).then(() => {
        this.mensaje_profile = "Se ha actualizado correctamente el perfil.";
      }).catch((error) => {
        this.mensaje_profile = "No se ha podido actualizar correctamente el perfil."
      });
    }
  }

  goBack() {
    this.location.back();
  }

  selectImage(event: any) {
    this.selectedFile = event.target.files[0];
    this.isSelected = true;
  }

  uploadImage() {
    const filePath = `images/${this.user?.uid}/${Date.now()}`;
    //sube la imagen y guarda el url

    const uploadTask = this.storage.upload(filePath, this.selectedFile).then(rst => {
      rst.ref.getDownloadURL().then(url => {
        this.downloadURL = url;
        this.mensaje_img = "Se ha subido correctamente la imagen";
      })
    })
  }
}
