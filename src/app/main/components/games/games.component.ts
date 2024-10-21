import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateGameComponent } from '../../dialogs/create-game/create-game.component';
import { GameService } from '../../services/game.service';
import { Games } from '../../types/games.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent {
  modal = inject(NgbModal);
  games$ = this.gameService.getAllGames();
  constructor(private gameService: GameService, private router: Router) {}
  createGame() {
    const dialog = this.modal.open(CreateGameComponent);
  }
  deleteGame(game: Games) {
    this.gameService.deleteGame(game);
  }
  viewGame(gameID: string) {
    this.router.navigate(['main/games', gameID]);
  }
}
