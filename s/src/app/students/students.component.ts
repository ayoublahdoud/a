import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student.model';
import { ConnectDBService } from '../services/connect-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Array<Student> = [];
  totalStudents: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  sizePage: number = 4;
  keyWord!: string;

  constructor(private service: ConnectDBService, private router: Router) {}

  ngOnInit(): void {
    this.getStudents();
  }

  public getStudents() {
    this.service
      .getStudentsPaginate(this.keyWord, this.currentPage, this.sizePage)
      .subscribe({
        next: (data) => {
          this.students = <Array<Student>>data.body;
          this.totalStudents = parseInt(
            <string>data.headers.get('X-Total-Count')
          );
          this.totalPages = Math.floor(this.totalStudents / this.sizePage);
          if (this.totalStudents % this.sizePage != 0) ++this.totalPages;
        },
        error: (err) => {
          throw Error(err);
        },
      });
  }

  handleUpdateStudent(prd: Student) {
    this.router.navigateByUrl(`/editStudent/${prd.id}`);
  }

  handleDeleteStudent(prd: Student) {
    this.service.deleteStudent(prd).subscribe({
      next: (value) => {
        this.students = this.students.filter((p) => p.id != prd.id);
      },
      error: (err) => {
        throw Error(err);
      },
    });
  }

  handleSearchStudent(keyWord: string) {
    this.currentPage = 1;
    this.totalStudents = 0;
    this.getStudents();
  }

  handleGoToPage(page: number) {
    this.currentPage = page;
    this.getStudents();
  }
}
