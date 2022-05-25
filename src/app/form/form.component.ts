import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Publicacion from '../interfaces/publicacion';
import { PublicacionesService } from '../publicaciones.service';
import { getAuth } from "firebase/auth";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  user = getAuth().currentUser;
  mensaje!: String;

  constructor(private publicacionesService: PublicacionesService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      contenido: [''],
      imagen: ['', [Validators.required]],
    })
  }

  async onSubmit() {
    console.log(this.form.value);

    let publicacion: Publicacion = {
      nombre: this.form.value.nombre,
      contenido: this.form.value.contenido,
      imagen: this.form.value.imagen,
      uid: this.user?.uid!,
    }
    const response = await this.publicacionesService.addPublicacion(publicacion);
    console.log(response);
  }

  uploadImagen(event: any) {
    
  }

}
