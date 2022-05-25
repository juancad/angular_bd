import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  mensaje!: string;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit() {
    const { email, password } = this.form.value;
    this.authService.login(email, password).pipe(
    ).subscribe(() => {
      this.router.navigate(['/main']);
    });
  }

  onClickGoogle() {
    this.authService.loginWithGoogle().pipe(
    ).subscribe(() => {
      this.router.navigate(['/main']);
    });
  }
}
