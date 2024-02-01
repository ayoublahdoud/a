import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  Liens: Array<any> = [
    { nom: 'Students', route: '/students', icon: 'bi-arrow-down-up' },
    { nom: 'New Student', route: '/newStudent', icon: 'bi-plus-circle' },
  ];

  currentLien: any = this.Liens[0];

  setCurrentLien(lien: any) {
    this.currentLien = lien;
  }
}
