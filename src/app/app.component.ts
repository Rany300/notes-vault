import { Component } from '@angular/core';
import { NavigationProp } from './components/main/navigation/navigation.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'notes-vault';

  // router links
  navigationProps: NavigationProp[];



  constructor(public authService: AuthService) { 
    
    this.navigationProps = [
      {
        name: 'Home',
        path: '/',
        viewable: 'always',
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
