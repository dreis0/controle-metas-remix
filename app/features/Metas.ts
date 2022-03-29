import { Meta } from "~/model";
import { Response } from "./Response";
import { db } from "~/server/db.server";

export async function createMeta(meta: Meta): Promise<Response> {
  var nomeIsValid = validateNomeMeta(meta.descricao);
  var horasIsValid = validateHorasMeta(meta.metaDeHoras);

  if (!nomeIsValid.result || !horasIsValid.result) {
    return {
      success: false,
      error: "Preencha os campos corretamente",
      fieldErrors: {
        nome: nomeIsValid.error ?? "",
        metaDeHoras: horasIsValid.error ?? "",
      },
    };
  }

  await db.meta.create({
    data: meta,
  });

  return { success: true };
}

export async function getMetas(): Promise<Meta[]> {
  return await db.meta.findMany({
    include: {
      horas: true,
    },
  });
}

export async function getMetaById(id: number): Promise<Meta> {
  return await db.meta.findUnique({
    where: { id: id },
    include: {
      horas: true,
    },
  });
}

function validateNomeMeta(nome: string): { result: boolean; error?: string } {
  if (!Boolean(nome)) return { result: false, error: "Informe um nome" };
  return { result: true };
}

function validateHorasMeta(qtd: number): { result: boolean; error?: string } {
  if (qtd <= 0)
    return {
      result: false,
      error: "Informe a quantidade de horas para a meta",
    };

  return { result: true };
}
