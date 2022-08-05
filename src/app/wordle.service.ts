import { Injectable } from '@angular/core';
import words from './_data/words';

@Injectable({
  providedIn: 'root',
})
export class WordleService {
  constructor() {}

  pickSolution(): string {
    return words[Math.floor(Math.random() * words.length)];
  }

  checkWord(word: string): boolean {
    return words.includes(word);
  }
}
