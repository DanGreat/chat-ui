import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  @Input() messages: any[] = []
  @Input() peerId: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  indexFn(index: number) {
    return index
  }

}
