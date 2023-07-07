export interface ValidazioneDinamicaPasswordDTO {
    campo: string;
    minimo: number;
    massimo: number;
    caratteriSpeciali: boolean;
    maiuscole: boolean;
    regexPass: string;
}