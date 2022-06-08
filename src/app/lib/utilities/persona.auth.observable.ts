import { AuthState } from "../models/auth-state";

export class PersonaAuthObservable {
  private static instance: PersonaAuthObservable;

  subscriptions: ((authInfo: AuthState) => void)[] = [];

  public static getInstance(): PersonaAuthObservable {
    if (!PersonaAuthObservable.instance) {
      PersonaAuthObservable.instance = new PersonaAuthObservable();
    }

    return PersonaAuthObservable.instance;
  }

  public updatePersona(data: any) {
    const authData: AuthState = {
      token: data?.accessToken.accessToken,
      user: data?.user,
      expiresAt: (Date.now() + data?.accessToken.expiresIn * 1000).toString(),
    };
    this.subscriptions.forEach((sub) => sub(authData));
  }

  public subscribe(callback: (authInfo: AuthState) => void) {
    this.subscriptions.push(callback);

    return () => {
      this.subscriptions = this.subscriptions.filter((cb) => cb !== callback);
    };
  }
}
