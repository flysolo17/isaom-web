import { ISignLanguageLesson } from '../../types/sign-language-lessons.interface';

export interface ILessonState {
  isLoading: boolean;
  lessons: ISignLanguageLesson[];
  error: string | null;
}
