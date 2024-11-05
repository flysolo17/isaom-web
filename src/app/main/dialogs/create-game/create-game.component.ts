import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Games } from '../../types/games.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { generateRandomString } from '../../../app.module';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.css',
})
export class CreateGameComponent {
  gameForm: FormGroup;
  selectedFile: File | null = null;
  fileError: boolean = false;
  activeModal = inject(NgbActiveModal);
  constructor(private fb: FormBuilder, private gameService: GameService) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      timer: [0, Validators.required],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.fileError = false;
    } else {
      this.fileError = true;
    }
  }

  async onSubmit() {
    if (this.gameForm.invalid || !this.selectedFile) {
      this.fileError = !this.selectedFile;
      return;
    }

    const game: Games = {
      id: generateRandomString(10),
      title: this.gameForm.value.title,
      cover: '',
      createdAt: new Date(),
      timer: this.gameForm.value.timer,
    };

    try {
      await this.gameService.createGame(game, this.selectedFile);
      this.activeModal.close();
    } catch (error) {
      console.error('Error creating game:', error);
    }
  }
}
