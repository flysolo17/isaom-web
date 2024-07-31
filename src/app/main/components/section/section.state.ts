import { EmailAuthCredential } from '@angular/fire/auth';
import { ISection } from '../../types/section.interface';

export interface ISectionState {
  isLoading: boolean;
  sections: ISection[];
  error: string | null;
}
