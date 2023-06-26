import { AggiuntaCategoriaDTO } from "./aggiunta-categoria-dto.model";
import { AggiuntaTagDTO } from "./aggiunta-tag-dto.model";

export interface AggiuntaArticoloDTO {
    titolo: string;
    contenuto: string;
    utente: number;
    tags: AggiuntaTagDTO[];
    categorie: AggiuntaCategoriaDTO[];
}