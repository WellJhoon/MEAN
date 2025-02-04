import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createNote(noteData: { title: string; content: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/notes`, noteData);
  }

  getNotes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notes`);
  }

  updateNote(
    id: string,
    noteData: { title: string; content: string }
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/notes/${id}`, noteData);
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/notes/${id}`);
  }
}
