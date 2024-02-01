import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { NewStudentComponent } from './new-student/new-student.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'newStudent', component: NewStudentComponent },
  { path: 'editStudent/:id', component: EditStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
