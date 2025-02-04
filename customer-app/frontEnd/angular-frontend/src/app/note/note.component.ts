import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NotesComponent implements OnInit {
  notes: any[] = [];
  newNote = { title: '', content: '' };

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe({
      next: (response) => {
        this.notes = response;
      },
      error: (error) => {
        console.error('Error fetching notes', error);
      },
    });
  }

  addNote(): void {
    this.notesService.createNote(this.newNote).subscribe({
      next: (response) => {
        this.notes.push(response);
        this.newNote = { title: '', content: '' }; // Limpiar el formulario
      },
      error: (error) => {
        console.error('Error creating note', error);
      },
    });
  }

  updateNote(note: any): void {
    this.notesService.updateNote(note._id, note).subscribe({
      next: (response) => {
        console.log('Note updated', response);
      },
      error: (error) => {
        console.error('Error updating note', error);
      },
    });
  }

  deleteNote(id: string): void {
    this.notesService.deleteNote(id).subscribe({
      next: () => {
        this.notes = this.notes.filter((note) => note._id !== id);
      },
      error: (error) => {
        console.error('Error deleting note', error);
      },
    });
  }
}
