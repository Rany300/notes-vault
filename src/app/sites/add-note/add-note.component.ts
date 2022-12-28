import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/services/note.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { SchemaService } from 'src/app/services/schema.service';
import createNoteSchema from 'schemas/create-note-schema';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.sass']
})
export class AddNoteComponent implements OnInit {


   noteForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    date: new FormControl(''),
    updatedAt: new FormControl(''),
    color: new FormControl(''),
    isPinned: new FormControl(''),
  });
  

  constructor(
    private router: Router,
    private schemaService: SchemaService,
    private notesService: NotesService,
  ) { 
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    const jsonSchema = createNoteSchema;
      // this.upsertNote(
    //   'Note Title',
    //   'Note Content',
    //   'yellow',
    //   false,
    // );


    const valid = this.schemaService.validateSchema(jsonSchema, {
      title: this.noteForm.value.title,
      content: this.noteForm.value.content,
      color: "green",
      isPinned: false,
    });

    if (valid) {
      await this.notesService.upsertNote(
        this.noteForm.value.title!,
        this.noteForm.value.content!,
        "green",
        false,
      );
      console.log("note got added");
      
      this.router.navigate(['/']);

    }







    
    
  }

}
