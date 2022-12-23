import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.sass']
})
export class NotesViewComponent implements OnInit {

  constructor(
    private notesService: NotesService
  ) { 
  }

  ngOnInit(): void {
  }

}
