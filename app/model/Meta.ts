import { LogHora } from "./LogHora";

export class Meta {
  id?: number;
  descricao: string = "";
  tipoDeMeta: number = 1;
  metaDeHoras: number = 0;

  horas?: LogHora[] = [];
}

