declare module 'keycloak-js' {
  interface KeycloakInstance {
    init(options: { onLoad?: string; redirectUri?: string }): Promise<void>;
    token: string | undefined;
    authenticated: boolean;
    login(): void;
    logout(): void;
    updateToken(minValidity: number): Promise<boolean>;
    // Adicione outros métodos conforme necessário
  }

  function Keycloak(config: {
    url: string;
    realm: string;
    clientId: string;
  }): KeycloakInstance;

  export default Keycloak;
}