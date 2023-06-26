import { UtenteCommentoDTO } from "../auth/utente-commento-dto.model";

export interface VisualizzaCommentoDTO {
    id: number;
    testo: string;
    autore: UtenteCommentoDTO;
}