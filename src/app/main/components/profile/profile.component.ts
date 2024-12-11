import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user$ = this.authService.getCurrentUser();
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout();

    this.router.navigate(['/'], { replaceUrl: true }).then(() => {
      window.location.reload();
    });
  }
}
