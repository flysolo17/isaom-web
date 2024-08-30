import { EmailAuthCredential } from '@angular/fire/auth';
import { ISection } from '../../types/section.interface';
import { IUsers } from '../../types/users.interface';

export interface ISectionState {
  isLoading: boolean;
  sections: ISection[];
  teachers: IUsers[];
  error: string | null;
}
