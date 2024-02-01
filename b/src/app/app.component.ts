import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  Liens: Array<any> = [
    { nom: 'Books', route: '/book', icon: 'bi-arrow-down-up' },
    { nom: 'New Book', route: '/newBook', icon: 'bi-plus-circle' },
  ];

  currentLien: any = this.Liens[0];

  setCurrentLien(lien: any) {
    this.currentLien = lien;
  }
}
