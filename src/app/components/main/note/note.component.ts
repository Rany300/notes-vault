import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/services/note.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.sass'],
})
export class NoteComponent implements OnInit {
  private static readonly DEBOUNCE_TIME = 500;

  @Input() note!: Note;
  @Input() active!: boolean;

  private titleChange$ = new Subject<string>();
  private contentChange$ = new Subject<string>();

  constructor(
    private notesService: NotesService,
  ) {}

  ngOnInit(): void {}

  public onAnyChange(event: Event) {
    //console.log(event);
    const element = event.target as HTMLElement;
    const classes = element.classList;
    const input = element.innerText;

    switch (true) {
      case classes.contains('note-title'):
        this.onTitleChange(input);
        break;
      case classes.contains('note-content'):
        this.onContentChange(input);
        break;
      default:
        break;
    }
  }

  private onTitleChange(input: string) {
    // Debounce
    this.titleChange$.next(input);
    this.titleChange$
      .pipe(debounceTime(NoteComponent.DEBOUNCE_TIME), distinctUntilChanged())
      .subscribe((input) => {
        this.note.title = input;
        this.updateNote();
      });
  }

  private onContentChange(input: string) {
    // Debounce
    this.contentChange$.next(input);
    this.contentChange$
      .pipe(debounceTime(NoteComponent.DEBOUNCE_TIME), distinctUntilChanged())
      .subscribe((input) => {
        this.note.content = input;
        this.updateNote();
      });
  }

  private updateNote() {
    this.notesService.upsertNote(
      this.note.title,
      this.note.content,
      this.note.color,
      this.note.isPinned,
      this.note.uid
    );
  }


}
