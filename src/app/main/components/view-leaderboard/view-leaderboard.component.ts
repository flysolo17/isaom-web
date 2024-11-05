import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MatchesWithGame } from '../../types/MatchWithGame';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { UsersComponent } from '../users/users.component';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { IUsers } from '../../types/users.interface';

@Component({
  selector: 'app-view-leaderboard',
  templateUrl: './view-leaderboard.component.html',
  styleUrl: './view-leaderboard.component.css',
})
export class ViewLeaderboardComponent {
  matchesWithGame$: MatchesWithGame[] = [];

  user$: Observable<IUsers | null> | undefined;
  constructor(
    private gamesService: GameService,
    private userService: UsersService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      const userID = params['id'];
      this.user$ = this.userService.getUserByID(userID);
      this.getMatches(userID);
    });
  }
  getMatches(userID: string) {
    this.gamesService.getMatchesByUID(userID).subscribe((data) => {
      this.matchesWithGame$ = data;

      console.log(data);
    });
  }
  get totalMatches(): number {
    return this.matchesWithGame$.reduce(
      (total, matchWithGame) => total + matchWithGame.matches.length,
      0
    );
  }
  get totalPoints(): number {
    let total = 0;
    this.matchesWithGame$.forEach((e) => {
      let highestScore = Math.max(
        ...e.matches.map((submission) => submission.score || 0)
      );
      total += highestScore;
    });
    return total;
  }
}
