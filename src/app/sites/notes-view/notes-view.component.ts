import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/services/note.model';

@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.sass'],
})
export class NotesViewComponent implements OnInit {
  activeNoteId: string;

  constructor(public notesService: NotesService) {
    this.activeNoteId = '';
  }

  ngOnInit(): void {}

  onNoteClick(note: Note) {
    console.log('onNoteOpen()');
    this.activeNoteId = note.uid || '';
  }

  onNoteOpen(note: Note) {
    this.activeNoteId = note.uid || '';
  }

  onNoteClose() {
    // TODO: This is rather a workaround than a solution
    /* 
     *PROBLEM: While clicking the close button, the click event is also being fired on the note itself.
     */

     //Workaround: Wait for the click event to be fired on the note and then close the note.
    setTimeout(() => {
      this.activeNoteId = '';
    }
    , 100);




  }

  async onNoteDelete(noteId: string) {
    try {
    await this.notesService.deleteNote(noteId);
    } catch (error) {
      console.log(error);
    }
  }
}
