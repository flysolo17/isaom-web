import { ISection } from './section.interface';
import { IUsers } from './users.interface';

export interface UserWithSection {
  users: IUsers;
  section: ISection | null;
}
