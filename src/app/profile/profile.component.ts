import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { getAuth, updateProfile, updateEmail } from "firebase/auth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  user = getAuth().currentUser;
  mensaje!: String;

  constructor(private fb: FormBuilder, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [this.user?.displayName, [Validators.required, Validators.maxLength(50)]],
      email: [this.user?.email, [Validators.required, Validators.email]],
      imagen: [this.user?.photoURL],
    })
  }

  saveProfile() {
    updateProfile(this.user!, {
      displayName: this.form.value.nombre, photoURL: this.form.value.imagen
    }).then(() => {
      this.mensaje = "Se ha actualizado correctamente el perfil.";
    }).catch((error) => {
      this.mensaje = "No se ha podido actualizar correctamente el perfil."
    });
    updateEmail(this.user!, this.form.value.email).then(() => {
      this.mensaje = "Se ha actualizado correctamente el perfil.";
    }).catch((error) => {
      this.mensaje = "No se ha podido actualizar correctamente el perfil."
    });
  }

  goBack() {
    this.location.back();
  }
}
