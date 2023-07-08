import { UtenteOutput } from "../auth/utente-output.model";

export interface VisualizzaVotoDTO {
    id: number,
    utente: UtenteOutput,
    voto: boolean
}