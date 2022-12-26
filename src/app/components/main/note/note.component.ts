import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/services/note.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.sass']
})
export class NoteComponent implements OnInit {

  @Input() note!: Note;
  @Input() active!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
