import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @ViewChild('chatWindow') chatWindow!: ElementRef;
  @Input() messages: any[] = [];
  @Input() me: string = '';

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  indexFn(index: number) {
    return index;
  }

  scrollToBottom(): void {
    this.chatWindow.nativeElement.scrollTop =
      this.chatWindow.nativeElement.scrollHeight;
    // this.chatWindow.nativeElement.scroll({
    //   top: this.chatWindow.nativeElement.scrollHeight,
    //   left: 0,
    //   behavior: 'smooth',
    // });
  }
}
