import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from '../../services/game.service';
import { Games } from '../../types/games.interface';

@Component({
  selector: 'app-edit-level',
  templateUrl: './edit-level.component.html',
  styleUrl: './edit-level.component.css',
})
export class EditLevelComponent {
  // @Input() gameToEdit: Games | null = null; // Input to receive the game to edit
  // gameForm: FormGroup;
  // selectedFile: File | null = null;
  // fileError: boolean = false;
  // activeModal = inject(NgbActiveModal);
  // constructor(private fb: FormBuilder, private gameService: GameService) {
  //   this.gameForm = this.fb.group({
  //     title: ['', Validators.required],
  //     timer: [0, Validators.required],
  //   });
  // }
  // ngOnInit() {
  //   if (this.gameToEdit) {
  //     // Populate the form with the existing game data
  //     this.gameForm.patchValue({
  //       title: this.gameToEdit.title,
  //       timer: this.gameToEdit.timer,
  //     });
  //   }
  // }
  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length) {
  //     this.selectedFile = input.files[0];
  //     this.fileError = false;
  //   } else {
  //     this.fileError = true;
  //   }
  // }
  // async onSubmit() {
  //   if (this.gameForm.invalid) {
  //     this.fileError = !this.selectedFile && !this.gameToEdit?.cover; // Show error if no file provided for new image
  //     return;
  //   }
  //   const updatedGame: Games = {
  //     ...this.gameToEdit,
  //     title: this.gameForm.value.title,
  //     timer: this.gameForm.value.timer,
  //   };
  //   try {
  //     await this.gameService.updateGame(updatedGame, this.selectedFile);
  //     this.activeModal.close();
  //   } catch (error) {
  //     console.error('Error updating game:', error);
  //   }
  // }
}
