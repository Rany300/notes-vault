import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from './note.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class NotesService {

  // static maxNotes = 100;


  private static readonly MAX_NOTES = 5;
  
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
    this.notes$.subscribe((notes) => {
      console.log(notes);
    });

    // this.addNote(
    //   "Note Title",
    //   "Note Content",
    //   "yellow",
    //   false
    // );

  }

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
          if (user !== null && user !== undefined &&  notes.length < NotesService.MAX_NOTES) {
            this.afs.collection(`notes/${user.uid}/notes`).add(note);
          }
        });
      }
    });
  }



  async deleteNote(
    uid: string
  ) {
    this.authService.user$.subscribe((user) => {
      if (user !== null && user !== undefined) {
        this.afs.collection(`notes/${user.uid}/notes`).doc(uid).delete();
      }
    });
  }


  async updateNote(
    uid: string,
    title: Note['title'],
    content: Note['content'],
    color: Note['color'],
    isPinned: Note['isPinned']
  ) {
    this.authService.user$.subscribe((user) => {
      if (user !== null && user !== undefined) {
        this.afs.collection(`notes/${user.uid}/notes`).doc(uid).update({
          title: title,
          content: content,
          updatedAt: new Date().toISOString(),
          color: color,
          isPinned: isPinned,
        });
      }
    });
  }


}
