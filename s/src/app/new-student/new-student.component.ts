import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConnectDBService } from '../services/connect-db.service';
import { Student } from '../model/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css'],
})
export class NewStudentComponent implements OnInit {
  public studentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ConnectDBService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: this.fb.control(''),
      mark: this.fb.control(0),
      course: this.fb.control(''),
    });
  }

  handleSaveStudent() {
    let student: Student = this.studentForm.value;
    this.service.saveStudent(student).subscribe({
      next: (value) => {
        alert('success');
        this.router.navigateByUrl(`/students`);
      },
      error: (err) => {
        throw Error(err);
      },
    });
  }
}
