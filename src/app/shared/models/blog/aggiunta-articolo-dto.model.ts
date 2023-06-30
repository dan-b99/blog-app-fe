import { AggiuntaTagDTO } from "./aggiunta-tag-dto.model";

export interface AggiuntaArticoloDTO {
    titolo: string;
    contenuto: string;
    tags: AggiuntaTagDTO[];
    categorie: number[];
}