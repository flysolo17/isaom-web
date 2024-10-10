import { EmailAuthCredential } from '@angular/fire/auth';
import { ISection, ISectionWithTeachers } from '../../types/section.interface';
import { IUsers } from '../../types/users.interface';

export interface ISectionState {
  isLoading: boolean;
  sections: ISectionWithTeachers[];
  teachers: IUsers[];
  error: string | null;
}
