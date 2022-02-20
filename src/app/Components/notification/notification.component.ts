import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  savedProject : string = "";

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notify.subscribe(data => this.savedProject = data);
  }
}
