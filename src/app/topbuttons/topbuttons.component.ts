import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbuttons',
  templateUrl: './topbuttons.component.html',
  styleUrls: ['./topbuttons.component.scss']
})
export class TopbuttonsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

  goRegister() {
    this.router.navigateByUrl('');
  }
}
