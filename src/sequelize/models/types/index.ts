export declare interface GoogleUser {
  readonly emailVerified: boolean;
  readonly isAnonymous: boolean;
  readonly displayName: string | null;
  readonly email: string | null;
  readonly phoneNumber: string | null;
  readonly photoURL: string | null;
  readonly providerId: string;
  readonly uid: string;
}
