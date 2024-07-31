import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface IAdministrator {
  id: string;
  email: string;
  name: string;
  profile: string;
  createdAt: Date;
}

export const IAdministratorConventer = {
  toFirestore: (data: IAdministrator) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const admin = snap.data() as IAdministrator;
    admin.createdAt = (admin.createdAt as any).toDate();
    return admin;
  },
};
