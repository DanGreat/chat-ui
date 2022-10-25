import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataConnection, Peer } from 'peerjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public from: string = '';
  public message: string = '';
  public messages: { message: string; from: string }[] = []

  private channel: BroadcastChannel = new BroadcastChannel('chat-room');

  constructor(private route: ActivatedRoute) {
    const from = this.route.snapshot.paramMap.get('from');
    if (from) this.from = from;
  }

  ngOnInit(): void {
    this.getExistingMessages()
    this.incomingMessageListener();
  }

  getExistingMessages() {
    const storageMessages = localStorage.getItem('messages') || '[]'
    const parsedMessages = JSON.parse(storageMessages)
    this.messages = parsedMessages
  }

  loadMoreMessages() {

  }

  incomingMessageListener() {
    this.channel.addEventListener('message', (message) => {
      this.messages.push(message.data);
      this.saveMessageToMemory(this.messages);
    });
  }

  sendMessage() {
    if (!this.message) {
      alert('No message provided');
      return;
    }

    const messsageObj = { message: this.message, from: this.from };
    this.channel.postMessage(messsageObj);

    this.messages.push(messsageObj);
    this.saveMessageToMemory(this.messages);

    this.message = '';
  }

  saveMessageToMemory(messages: any[]) {
    localStorage.setItem('messages', JSON.stringify(messages));
  }
}
