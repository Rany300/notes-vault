import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginViewComponent } from './sites/login-view/login-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationComponent } from './components/main/navigation/navigation.component';
import { NotesViewComponent } from './sites/notes-view/notes-view.component';
import { MainViewComponent } from './sites/main-view/main-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginViewComponent,
    NavigationComponent,
    NotesViewComponent,
    MainViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
