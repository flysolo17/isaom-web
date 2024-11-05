import { GameSubmission } from './game.submissions';
import { Games } from './games.interface';
import { IUsers } from './users.interface';

export interface MatchesWithGame {
  game: Games | null;
  matches: GameSubmission[];
}
