import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Colors, Note } from 'src/app/services/note.model';
import { NotesService } from 'src/app/services/notes.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { SchemaService } from 'src/app/services/schema.service';
import updateNoteSchema from 'schemas/update-note-schema';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.sass'],
})
export class NoteComponent implements OnInit {
  private static readonly DEBOUNCE_TIME = 1000;

  faTrashAlt = faTrashAlt;
  faTimes = faTimes;
  faUserEdit = faUserEdit;

  _note: Note = {
    title: '',
    content: '',
    color: Colors.yellow,
    isPinned: false,
    date: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    uid: '',
  };

  noteForm = new FormGroup({
    title: new FormControl(this.note.title),
    content: new FormControl(this.note.content),
    color: new FormControl(this.note.color),
  });
  private formChangesSubscription!: Subscription;

  @Input()
  set note(note: Note) {
    this._note = note;
    this.noteForm.patchValue({
      title: note.title,
      content: note.content,
      color: note.color,
    });
  }
  get note(): Note {
    return this._note;
  }

  @Input() active!: boolean;
  @Output() noteCloseEmitter = new EventEmitter();
  @Output() noteDeleteEmitter = new EventEmitter<string>();

  onNoteDelete(noteId: string) {
    console.log('Start emitting');
    this.noteDeleteEmitter.emit(noteId);
  }

  onNoteClose() {
    console.log('Start emitting');
    this.noteCloseEmitter.emit();
  }

  private debounceTimer: NodeJS.Timeout | null = null;

  constructor(
    private notesService: NotesService,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.formChangesSubscription = this.noteForm.valueChanges.subscribe(
      (form) => {
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
        }

        this.debounceTimer = setTimeout(() => {
          this.updateNote(
            form.title || '',
            form.content || '',
            form.color || Colors.yellow,
            this.note.isPinned || false,
            this.note.uid || ''
          );
        }, NoteComponent.DEBOUNCE_TIME);
      }
    );
  }

  private async updateNote(
    title: string,
    content: string,
    color: Note['color'],
    isPinned: Note['isPinned'],
    uid: Note['uid']
  ) {
    console.log('Updating note');

    try {
      const schemaValid = this.schemaService.validateSchema(updateNoteSchema, {
        title,
        content,
        color,
        isPinned,
        uid,
      });

      if (!schemaValid) {
        throw new Error('Invalid note input');
      }

      await this.notesService.upsertNote(title, content, color, isPinned, uid);
    } catch (error) {
      console.error('Error updating note: ', error);
      alert('Error updating note: ' + error);
    }
  }
}
