import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // Its public this time, because we are going to use it in the template file
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
