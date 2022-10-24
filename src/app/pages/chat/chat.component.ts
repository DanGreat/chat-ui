import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Peer } from "peerjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private peer: any
  private connection: any

  public message: string = ''

  constructor(
    private route: ActivatedRoute
  ) {
    const peerId = this.route.snapshot.paramMap.get('peerId')
    console.log('Peer: ', peerId);
    if(peerId) this.createPeer(peerId)
   }

  ngOnInit(): void {
    this.incomingMessageListener()
  }

  createPeer(peerId: string) {
    this.peer = new Peer(peerId);
  }

  connectWithOtherPeer(otherPeerId: string) {    
    this.connection = this.peer.connect(otherPeerId);
  }

  incomingMessageListener() {
    this.peer.on("connection", (conn: any) => {      
      conn.on("data", (data: any) => {
        console.log('Message received: ', data);
      });
    });
  }

  sendMessage() {
    if(!this.message) {
      alert('No message provided')
      return
    }

    this.connection.on("open", () => {
      this.connection.send(this.message);
    });
  }
  
}
