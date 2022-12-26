import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/services/note.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.sass']
})
export class NotesViewComponent implements OnInit {

  activeNote$: Observable<Note | undefined | null>;


  constructor(
    public notesService: NotesService
  ) { 
    this.activeNote$ = of(null);
  }

  ngOnInit(): void {
  }

  onNoteClick(note: Note) {
    console.log(note.uid);
    this.activeNote$ = of(note);
  }

}
