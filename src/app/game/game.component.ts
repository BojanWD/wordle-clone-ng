import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WordleService } from '../wordle.service';
import { ModalMessageComponent } from './modal-message/modal-message.component';

const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  @HostListener('document:keydown', ['$event'])
  onKeyDown(ev: KeyboardEvent) {
    const key = ev.key;
    this.handleKey(key);
  }

  solution: string = '';
  row: number = 0;
  col: number = 0;
  gameEnded: boolean = false;
  board = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];

  boardTiles = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];

  keyColors: { [key: string]: string } = {};
  modalMessage: string = 'test message';

  constructor(private service: WordleService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.solution = this.service.pickSolution();
    console.log(this.solution);
  }

  // handling Enter, Backspace and letters
  handleLetter(letter: string) {
    if (this.col === 5) {
      return;
    }

    this.board[this.row][this.col] = letter;
    this.col += 1;
  }

  handleBackspace() {
    if (this.col === 0) {
      return;
    } else {
      this.board[this.row][this.col - 1] = '';
      this.col -= 1;
    }
  }

  handleEnter() {
    if (this.col === 5) {
      let answer = this.board[this.row].join('');
      if (!this.service.checkWord(answer)) {
        this.modalMessage = 'Not in word list';
        this.openModal();
        return;
      }

      // boardTiles coloring
      for (let i = 0; i < 5; i++) {
        if (answer[i] === this.solution[i]) {
          this.boardTiles[this.row][i] = 'correct';
        } else if (this.solution.includes(answer[i])) {
          this.boardTiles[this.row][i] = 'present';
        } else {
          this.boardTiles[this.row][i] = 'not-present';
        }
      }

      //keyboard coloring
      for (let i = 0; i < 5; i++) {
        for (let i2 = 0; i2 < 6; i2++) {
          if (!this.board[i][i2]) {
            break;
          }
          if (this.board[i][i2]) {
            if (this.board[i][i2] in this.keyColors) {
              if (this.boardTiles[i][i2] === 'correct') {
                this.keyColors[this.board[i][i2]] = 'correct';
              }
            } else if (this.boardTiles[i][i2] === 'present') {
              if (this.keyColors[this.board[i][i2]] === 'correct') {
                continue;
              } else {
                this.keyColors[this.board[i][i2]] = 'present';
              }
            } else if (this.boardTiles[i][i2] === 'not-present') {
              this.keyColors[this.board[i][i2]] = 'not-present';
            } else {
              this.keyColors[this.board[i][i2]] = this.boardTiles[i][i2];
            }
          }
        }
      }

      if (answer === this.solution) {
        this.modalMessage = 'Well played, you won';
        this.gameEnded = true;
        this.openModal();
        return;
      }

      if (this.row === 5 && answer !== this.solution) {
        this.modalMessage = `Unfortunately, you lose. The word was ${this.solution}. Try again!`;
        this.gameEnded = true;
        this.openModal();
        return;
      }
      this.row += 1;
      this.col = 0;
    } else if (this.col < 5) {
      this.modalMessage = 'Not enough letters';
      this.openModal();
    }
  }

  handleKey(key: string) {
    if (this.gameEnded) {
      return;
    }
    if (letters.includes(key.toUpperCase())) {
      this.handleLetter(key.toLowerCase());
    }

    if (key === 'Enter') {
      this.handleEnter();
    }
    if (key === 'Backspace') {
      this.handleBackspace();
    }
  }

  openModal() {
    let options = { centered: true };
    const modalRef = this.modalService.open(ModalMessageComponent, options);
    modalRef.componentInstance.message = this.modalMessage;

    if (this.modalMessage === 'Not enough letters') {
      setTimeout(() => {
        this.modalService.dismissAll();
      }, 500);
    }

    if (this.modalMessage === 'Not in word list') {
      setTimeout(() => {
        this.modalService.dismissAll();
      }, 500);
    }
  }

  openModal2() {
    this.modalMessage = 'Well played';
    let options = { centered: true };
    const modalRef = this.modalService.open(ModalMessageComponent, options);
    modalRef.componentInstance.message = this.modalMessage;
  }
}
