import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Publicacion from '../interfaces/publicacion';
import { PublicacionesService } from '../publicaciones.service';
import { getAuth } from "firebase/auth";
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  user = getAuth().currentUser;
  mensaje!: String;
  publicaciones: Publicacion[] = [];

  constructor(private publicacionesService: PublicacionesService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.publicacionesService.getPublicaciones(this.user?.uid!).subscribe(publicaciones => {
      this.publicaciones = publicaciones;
    });
  }

  openEditDialog(publicacion: Publicacion) {
    const dialogRef = this.dialog.open(DialogEdit);
    dialogRef.componentInstance.publicacion = publicacion;
  }

  async onClickDelete(publicacion: Publicacion) {
    const dialogRef = this.dialog.open(DialogDelete);
    dialogRef.componentInstance.publicacion = publicacion;

    dialogRef.afterClosed().subscribe(result => {
      if (!`${result}`) {
        this.publicacionesService.deletePublicacion(publicacion);
      }
    });
  }
}

@Component({
  selector: 'dialog-edit',
  templateUrl: './list.dialog-edit.html',
  styleUrls: ['./list.component.scss']
})
export class DialogEdit implements OnInit {
  publicacion!: Publicacion;
  form!: FormGroup;
  selectedFile!: File;
  isSelected = false;
  downloadURL!: string;
  mensaje!: String;
  user = getAuth().currentUser;

  constructor(private publicacionesService: PublicacionesService, private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl(this.publicacion.nombre, Validators.required),
      contenido: new FormControl(this.publicacion.contenido, Validators.required),
      imagen: new FormControl(''),
    })
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
        this.mensaje = "Se ha subido correctamente la imagen";
      })
    })
  }

  edit() {
    if(this.downloadURL!=null) {
      this.publicacion.imagen = this.downloadURL.toString();
    }
    this.publicacion.nombre = this.form.value.nombre;
    this.publicacion.contenido = this.form.value.contenido;
    this.publicacionesService.updatePublicacion(this.publicacion);
  }
}

@Component({
  selector: 'dialog-delete',
  templateUrl: './list.dialog-delete.html',
  styleUrls: ['./list.component.scss']
})
export class DialogDelete implements OnInit {

  publicacion!: Publicacion;

  ngOnInit(): void {
  }
}