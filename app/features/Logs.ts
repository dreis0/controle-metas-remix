import { db } from "../server/db.server";
import { Response } from "./Response";

export async function addHoras({
  metaId,
  horas,
}: {
  metaId: number;
  horas: number;
}): Promise<Response> {
  const horasIsValid = validateHoras(horas);

  if (!horasIsValid.result)
    return {
      success: false,
      error: "Preencha os campos corretamente",
      fieldErrors: {
          horas: horasIsValid.error ?? ""
      },
    };

  await db.logHoras.create({
    data: {
        horas: horas,
        metaId: metaId,
        data: new Date()
    },
  });

  return { success: true };
}

function validateHoras(horas: number): { result: boolean; error?: string } {
  if (!Boolean(horas) && horas > 0)
    return { result: false, error: "Informe uma quantidade válida de horas" };
  return { result: true };
}
