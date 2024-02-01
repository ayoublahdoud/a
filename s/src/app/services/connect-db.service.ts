import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class ConnectDBService {
  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('http://localhost:5555/students');
  }
  getStudentsPaginate(
    keyWord: string = '',
    page: number = 1,
    size: number = 4
  ) {
    return this.http.get<Student[]>(
      `http://localhost:5555/students?name_like=${keyWord}&_page=${page}&_limit=${size}`,
      { observe: 'response' }
    );
  }

  getStudentByKeyWord(keyWord: string): Observable<Student[]> {
    return this.http.get<Student[]>(
      `http://localhost:5555/students?name_like=${keyWord}`
    );
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(
      `http://localhost:5555/students/${student.id}`,
      student
    );
  }

  deleteStudent(prd: Student): Observable<any> {
    return this.http.delete(`http://localhost:5555/students/${prd.id}`);
  }

  saveStudent(student: Student): Observable<Student> {
    return this.http.post<Student>('http://localhost:5555/students/', student);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`http://localhost:5555/students/${id}`);
  }
}
