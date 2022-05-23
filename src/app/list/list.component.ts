import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Publicacion from '../interfaces/publicacion';
import { PublicacionesService } from '../publicaciones.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  publicaciones!: Publicacion[];
  
  constructor(private publicacionesService: PublicacionesService, private router: Router) {
  }

  ngOnInit(): void {
    this.publicacionesService.getPublicaciones().subscribe(publicaciones => {
      this.publicaciones = publicaciones;
    });
  }

  async onClickDelete(publicacion: Publicacion) {
    const response = await this.publicacionesService.deletePublicacion(publicacion);
    console.log(response);
  }
}
