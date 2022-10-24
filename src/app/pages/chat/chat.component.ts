import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataConnection, Peer } from 'peerjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  private peer: any;
  public peerId: string = '';
  private connection: any;

  public message: string = '';
  public messages: any[] = [];

  constructor(private route: ActivatedRoute) {
    const peerId = this.route.snapshot.paramMap.get('peerId');
    if(peerId) this.peerId = peerId
  }

  ngOnInit(): void {
    this.initializePeer();
    this.incomingMessageListener();
  }

  initializePeer() {
    this.peer = new Peer(this.peerId);
  }

  connectWithOtherPeer(otherPeerId: string) {
    this.connection = this.peer.connect(otherPeerId);
  }

  incomingMessageListener() {
    this.peer.on('connection', (conn: DataConnection) => {     
      conn.on('data', (data: any) => {
        this.messages.push({from: conn.peer, message: data})
      });
    });
  }

  sendMessage() {
    if (!this.message) {
      alert('No message provided');
      return;
    }

    this.connection.send(this.message);
    this.messages.push({from: this.peerId, message: this.message})
    this.message = '';
  }


}
