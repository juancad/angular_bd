import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  mensaje!: string;
  
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit() {
    const { nombre, email, password } = this.form.value;
    this.authService.register(email, password)
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  onClickGoogle() {
    this.authService.loginWithGoogle()
      .subscribe(() => {
        this.router.navigate(['/main']);
      });
  }
}