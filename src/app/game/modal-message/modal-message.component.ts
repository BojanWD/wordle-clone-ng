import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css'],
})
export class ModalMessageComponent implements OnInit {
  @Input() message: string = '';
  firstClick: number = 0;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  refreshPage() {
    if (this.firstClick === 0) {
      this.firstClick++;
      return;
    }

    window.location.reload();
  }

  onClose() {
    this.activeModal.close();
  }
}
