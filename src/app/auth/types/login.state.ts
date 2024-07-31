import { IAdministrator } from '../../shared/types/administrator.interface';

export interface ILoginState {
  isLoading: boolean;
  admin: IAdministrator | undefined | null;
  error: string | null;
}
