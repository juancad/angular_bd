import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicacionesService } from '../publicaciones.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  constructor(private publicacionesService: PublicacionesService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      contenido: [''],
      imagen: ['', [Validators.required]],
    })
  }

  async onSubmit() {
    console.log(this.form.value);
    const response = await this.publicacionesService.addPublicacion(this.form.value);
    console.log(response);
  }
}
