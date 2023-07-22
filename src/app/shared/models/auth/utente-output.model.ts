import { RuoloOutputDTO } from "./ruolo-output-dto.model";

export interface UtenteOutput {
    id: number,
    nome: string,
    cognome: string,
    email: string,
    ruoli: RuoloOutputDTO[];
    bloccato: boolean;
    regexMatch: boolean;
}