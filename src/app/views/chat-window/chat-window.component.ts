import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('chatWindow', { read: ElementRef }) chatWindow!: ElementRef<any>;
  @Input() messages!: any[];
  @Input() me!: string;

  public CHAT_SIZE: number = -25;
  public loadingMessage: string = '';
  public isLoading: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['messages'].previousValue) {
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  indexFn(index: number) {
    return index;
  }

  scrollToBottom(): void {
    this.chatWindow.nativeElement.scroll({
      top: this.chatWindow.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  onScroll() {
    const top = this.chatWindow.nativeElement.scrollTop;

    if (top === 0 && this.messages.length > Math.abs(this.CHAT_SIZE)) {
      this.isLoading = true;
      this.loadingMessage = 'Loading more messages...';

      setTimeout(() => {
        this.CHAT_SIZE += this.CHAT_SIZE;
        this.isLoading = false;
        this.loadingMessage = '';
      }, 3000);
    }
  }
}
