import { UtenteOutput } from "./utente-output.model";

export interface Autenticazione {
    jwt: string,
    utenteOutput: UtenteOutput 
}