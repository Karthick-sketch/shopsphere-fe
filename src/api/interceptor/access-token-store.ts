export default class AccessTokenStore {
  private static accessToken: string | null = "";

  static setAccessToken(accessToken: string): void {
    AccessTokenStore.accessToken = accessToken;
  }

  static getAccessToken(): string | null {
    return AccessTokenStore.accessToken;
  }

  static clearAccessToken(): void {
    AccessTokenStore.accessToken = null;
  }
}
