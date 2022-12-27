import { Component } from '@angular/core';
import { NavigationProp } from './components/main/navigation/navigation.model';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'notes-vault';

  navigationProps: NavigationProp[];

  constructor(private router: Router, public authService: AuthService) {
    this.navigationProps = [
      {
        name: 'Home',
        path: '/',
        viewable: 'always',
      },
      {
        name: 'Add Note',
        path: '/add',
        viewable: 'logged-in',
        action: () => {
          router.navigate(['/add']);
        },
      },
      {
        name: 'SignOut',
        path: '/',
        viewable: 'logged-in',
        action: () => this.authService.signOut(),
      },
    ];
  }
}
