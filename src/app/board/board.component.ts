import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @Input() board: string[][] = [];
  @Input() boardTiles: string[][] = [];
  constructor() {}

  ngOnInit(): void {}
}
