import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  autor = "Juan Carlos Alcalde Díaz";
  
  constructor() { }

  ngOnInit(): void {
  }

}
