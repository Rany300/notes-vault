import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from './note.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable, of, take } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  // static maxNotes = 100;

  private static readonly MAX_NOTES = 500;

  notes$: Observable<Note[] | null | undefined>;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private authService: AuthService
  ) {
    // if the notes collection is empty, create a new one with the user's uid

    this.notes$ = this.authService.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs
            .collection<Note>(`notes/${user.uid}/notes`)
            .valueChanges({ idField: 'uid' });
        } else {
          return of(null);
        }
      })
    );


    // log the current user's notes
    // this.notes$.subscribe((notes) => {
    //   console.log('Notes:');
    //   console.log(notes);
    // });

    // this.addNote(
    //   "Note Title",
    //   "Note Content",
    //   "yellow",
    //   false
    // );

    // this.upsertNote(
    //   'Note Title',
    //   'Note Content',
    //   'yellow',
    //   false,
    // );
  }

  /**
 * @deprecated Has been replaced by upsertNote
 */
  async addNote(
    title: Note['title'],
    content: Note['content'],
    color: Note['color'],
    isPinned: Note['isPinned']
  ) {
    this.notes$.subscribe((notes) => {  

      if (notes !== null && notes !== undefined) {
        const note: Note = {
          title: title,
          content: content,
          date: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          color: color,
          isPinned: isPinned,
        };
        this.authService.user$.subscribe((user) => {
          if (
            user !== null &&
            user !== undefined &&
            notes.length < NotesService.MAX_NOTES
          ) {
            this.afs.collection(`notes/${user.uid}/notes`).add(note);
          }
        }).unsubscribe();
      }
    }).unsubscribe();
  }

  async deleteNote(uid: string) {
    const user = await this.authService.user;
    if (user) {
      this.afs.collection(`notes/${user.uid}/notes`).doc(uid).delete();
    }
  }

  async upsertNote(
    title: Note['title'],
    content: Note['content'],
    color: Note['color'],
    isPinned: Note['isPinned'],
    uid?: string
  ) {

    const user = await this.authService.user;
    if (user){
      console.log("b",user.uid);
      let notes = await this.notes;
      console.log("a",notes);


      if (notes !== null && notes !== undefined) {
        switch (true) {
          case uid === undefined:
            // add a new note
            if (notes.length < NotesService.MAX_NOTES) {
              console.log('Adding new note');
              this.afs.collection(`notes/${user.uid}/notes`).add(
                {
                  title: title,
                  content: content,
                  date: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  color: color,
                  isPinned: isPinned,
                }
              );
            }
            break;
            case uid !== undefined:
            // update an existing note
            this.afs
              .collection(`notes/${user.uid}/notes`)
              .doc(uid)
              .update(
                {
                  title: title,
                  content: content,
                  updatedAt: new Date().toISOString(),
                  color: color,
                  isPinned: isPinned,
                },
              );
            break;
          }
      }
    }
  }


  public get notes(): Promise<Note[] | null | undefined> {
    // TODO: Not use the deprecated toPromise() method
    return this.notes$.pipe(take(1)).toPromise();
  }
  



}
