import { Note } from "./note.model";
export type User = {
    uid: string;
    email?: string | null;
    photoURL?: string | null;
    displayName?: string | null;
    myCustomData?: string | null;
  }
  