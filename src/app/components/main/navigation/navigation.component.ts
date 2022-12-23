import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationProp } from './navigation.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  @Input() navigationProps: NavigationProp[] = [];

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
