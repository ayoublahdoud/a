import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectDBService } from '../services/connect-db.service';
import { Student } from '../model/student.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  studentForm!: FormGroup;
  studentId: number;

  constructor(
    private fb: FormBuilder,
    private ar: ActivatedRoute,
    private service: ConnectDBService,
    private router: Router
  ) {
    this.studentId = this.ar.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.service.getStudentById(this.studentId).subscribe({
      next: (data) => {
        this.studentForm = this.fb.group({
          id: [data.id],
          name: [data.name],
          mark: [data.mark],
          course: [data.course],
        });
      },
      error: (err) => {
        throw Error(err);
      },
    });
  }

  handleUpdateStudent() {
    let student: Student = this.studentForm.value;
    this.service.updateStudent(student).subscribe({
      next: (data) => {
        alert('updated');
        this.router.navigateByUrl(`/students`);
      },
      error: (err) => {
        throw Error(err);
      },
    });
  }
}
