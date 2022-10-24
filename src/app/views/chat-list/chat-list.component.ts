import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  @Output() onSelect: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  select(otherPeerId: string) {
    this.onSelect.emit(otherPeerId)
  }

}
