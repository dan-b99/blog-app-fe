import { UtenteOutput } from "../auth/utente-output.model";
import { VisualizzaCategoriaDTO } from "./visualizza-categoria-dto.model";
import { VisualizzaCommentoDTO } from "./visualizza-commento-dto.model";
import { VisualizzaTagDTO } from "./visualizza-tag-dto.model";
import { VisualizzaVotoDTO } from "./visualizza-voto-dto.model";

export interface VisualizzaArticoloDTO {
    id: number;
    titolo: string;
    contenuto: string;
    tags: VisualizzaTagDTO[];
    utente: UtenteOutput;
    categorie: VisualizzaCategoriaDTO[];
    commenti: VisualizzaCommentoDTO[];
    voti: VisualizzaVotoDTO[];
}