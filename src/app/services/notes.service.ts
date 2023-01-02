import { Injectable } from '@angular/core';
import { Note } from './note.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable, of, take } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotesService {

  private static readonly MAX_NOTES = 20;

  notes$: Observable<Note[] | null | undefined>;

  constructor(
    private afs: AngularFirestore,
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
  }

  /**
   * I don't actually use this method, but it's here for completeness.
  **/

  async getNote(uid: string): Promise<Note | null> {
    const user = await this.authService.user;
    if (user) {
      const noteDoc = this.afs.collection<Note>(`notes/${user.uid}/notes`).doc<Note>(uid);
      const note = await noteDoc.valueChanges().pipe(take(1)).toPromise() as Note;
      return note;
    } else {
      return null;
    }
  }

async addNote(title: Note['title'], content: Note['content'], color: Note['color'], isPinned: Note['isPinned']) {
  const user = await this.authService.user;
  if (user) {
    this.afs.collection(`notes/${user.uid}/notes`).add({
      title: title,
      content: content,
      date: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      color: color,
      isPinned: isPinned,
    });
  }
}

async updateNote(uid: string, title: Note['title'], content: Note['content'], color: Note['color'], isPinned: Note['isPinned']) {
  const user = await this.authService.user;
  if (user) {
    this.afs.collection(`notes/${user.uid}/notes`).doc(uid).update({
      title: title,
      content: content,
      updatedAt: new Date().toISOString(),
      color: color,
      isPinned: isPinned,
    });
  }
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
    if (!user) {
      throw new Error('Unauthenticated');
    }
    const notes = await this.notes;
    // If notes.length is undefined then return null
    if (notes === null || notes === undefined) {
      return;
    }

    if (!uid) {
      // add a new note
      if (notes?.length >= NotesService.MAX_NOTES) {
        throw new Error('Maximum number of notes exceeded');
      }
      this.addNote(title, content, color, isPinned);
    } else {
      // update an existing note
      this.updateNote(uid, title, content, color, isPinned);
    }
  }


  

  public get notes(): Promise<Note[] | null | undefined> {
    // TODO: Not use the deprecated toPromise() method
    return this.notes$.pipe(take(1)).toPromise();
  }
  



}
