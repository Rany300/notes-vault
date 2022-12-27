import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/services/note.model';
import { Subject, ReplaySubject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.sass'],
})
export class NotesViewComponent implements OnInit {

  activeNote$: Subject<Note | null>;


  constructor(
    public notesService: NotesService
  ) { 
    this.activeNote$ = new BehaviorSubject<Note | null>(null);
  }

  ngOnInit(): void {
    this.activeNote$.subscribe(note => {
        console.log('activeNote$', note);
      }
    );
  }

  onNoteClick(note: Note) {
    this.activeNote$.next(note);
  }

  onNoteClose() {
    console.log('close');
    this.activeNote$.next(null);
  }

  onNoteDelete(noteId: string) {
    this.notesService.deleteNote(noteId);
  }


}
