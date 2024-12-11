import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { LevelsService } from '../../services/levels.service';
import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { Games } from '../../types/games.interface';
import { Levels } from '../../types/levels.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateLevelComponent } from '../../dialogs/create-level/create-level.component';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

export interface GameState {
  games: Games | undefined;
  levels: Levels[];
}
@Component({
  selector: 'app-view-game',
  templateUrl: './view-game.component.html',
  styleUrl: './view-game.component.css',
})
export class ViewGameComponent implements OnInit {
  modalService = inject(NgbModal);
  gameState$: Observable<GameState> = of({ games: undefined, levels: [] });
  gameID: string = '';
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private levelService: LevelsService,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.gameID = gameId;
      this.gameState$ = combineLatest([
        this.gameService.getGameByID(gameId),
        this.levelService.getAllQuestions(gameId),
      ]).pipe(switchMap(([games, levels]) => of({ games, levels })));
    }
  }

  update(gameID: string, levels: Levels[]) {
    let questions = levels.map((e) => e.id);
    this.gameService.addQuestionID(gameID, questions);
    console.log('Updated');
  }
  createLevel(id: string) {
    const modal = this.modalService.open(CreateLevelComponent);
    modal.componentInstance.gameID = id;
  }
  deleteLevel(level: Levels) {
    const modal = this.modalService.open(DeleteConfirmationComponent);
    modal.componentInstance.message = `Are you sure you want to delete this level ?`;
    modal.result.then((data) => {
      if (data === 'YES') {
        this.levelService.deleteLevels(this.gameID, level);
      }
    });
  }

  deleteGame(game: Games) {
    const modal = this.modalService.open(DeleteConfirmationComponent);
    modal.componentInstance.message = `Are you sure you want to delete this Game ?`;
    modal.result.then((data) => {
      if (data === 'YES') {
        this.gameService.deleteGame(game);
      }
    });
  }
}
