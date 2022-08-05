import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
})
export class KeyboardComponent implements OnInit {
  @Input() keyColors: { [key: string]: string } = {};
  @Output() keyEmitter: EventEmitter<string> = new EventEmitter();
  topRowKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  middleRowKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  bottomRowKeys = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  constructor() {}

  ngOnInit(): void {}

  emitKey(key: string) {
    console.log(key);
    this.keyEmitter.emit(key);
  }
}
