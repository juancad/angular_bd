import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  mensaje!: string;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.userService.login(this.form.value)
    .then(response => {
      console.log(response);
      this.router.navigate(['/main']);
    })
    .catch(error => {
      console.log(error);
      this.mensaje = "No se ha podido iniciar sesión con esas credenciales."
    });
  }

  onClick() {
    this.userService.loginWithGoogle()
    .then(response => {
      console.log(response);
      this.router.navigate(['/main']);
    })
    .catch(error => console.log(error))
  }
}
