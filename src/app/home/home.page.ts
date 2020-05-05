import { Component, OnInit } from '@angular/core';
import { UserModel } from '../user.model';
import { JsonPlaceholderService } from '../json-placeholder.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  users: UserModel[];

  constructor(
    private jsonPlaceholderService: JsonPlaceholderService,
    private nav: NavController
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.jsonPlaceholderService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error(error);
      });
  }

  onBtnClick(userId: number) {
    this.nav.navigateForward(`album/${userId}`);
  }
}
