import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Variables to handle form submission and store user credentials
  public formError: string = '';
  submitted = false;
  credentials = {
    name: '',
    email: '',
    password: ''
  };

  // Inject Router and AuthenticationService
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  // Implement ngOnInit (no additional setup needed in this case)
  ngOnInit(): void {}

  // Method to handle form submission
  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Returns to login page if validation fails
    } else {
      this.doLogin();
    }
  }

  // Method to execute login process
  private doLogin(): void {
    const newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    // Call login method from AuthenticationService
    this.authenticationService.login(newUser, this.credentials.password);

    // Check if user is logged in, if so redirect, else set a timeout to retry
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']); // Redirect to home or another route on successful login
    } else {
      // Set a timer to check login status after 3 seconds
      setTimeout(() => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']);
        }
      }, 3000);
    }
  }
}
