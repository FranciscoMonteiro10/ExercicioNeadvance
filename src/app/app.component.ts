import { Component, OnInit } from '@angular/core';
import Jsonfile from '../assets/sidebar_default.json';
import { NotificationService } from './Services/notification.service';

interface Project {
  name: string;
  customer: string;
  description: string;
  folder: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}

  title = 'my-app';
  display = false;
  savedProject: string = '';
  project: Project = {
    name: '',
    customer: '',
    description: '',
    folder: '',
  };

  ngOnInit(): void {
    const configsSideBar = Jsonfile.configsSideBar as any;

    configsSideBar.forEach((config: any, index: number) => {
      Jsonfile.categories.forEach((category) => {
        const result = category.subcategories.find(
          (subcategory) => subcategory.id === config.subcategory
        );

        if (result !== undefined) {
          configsSideBar[index].subcategory = result;
        }
      });
    });
    console.log(configsSideBar);
  }

  showModalDialog() {
    this.display = true;
  }

  create() {
    this.display = false;
    this.notificationService.notify.next(JSON.stringify(this.project));
  }

  toValidate(): boolean {
    if (
      this.project.name === '' ||
      this.project.customer === '' ||
      this.project.description === '' ||
      this.project.folder === ''
    ) {
      return true;
    }
    return false;
  }
}
