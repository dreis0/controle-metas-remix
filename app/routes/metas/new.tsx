import { ActionFunction, Form, Link, redirect, useActionData } from "remix";
import { createMeta } from "~/features";
import { Response } from "~/features/Response";
import { badRequest } from "~/utils";
import { Button, Modal, SelectInput, TextInput } from "../../components";
import { XIcon } from "@heroicons/react/solid";

export const action: ActionFunction = async ({ request }) => {
  var form = await request.formData();
  var nome = form.get("nome") as string;
  var horas = form.get("horas");
  var tipo = form.get("tipo");

  var result = await createMeta({
    descricao: nome,
    metaDeHoras: Number(horas),
    tipoDeMeta: Number(tipo),
  });

  if (!result.success) return badRequest(result);

  return redirect("metas");
};

export default function () {
  var action = useActionData<Response>();

  return (
    <Modal>
      <Form method="post">
        <div className="sm:overflow-hidden md:bg-white">
          <div className="">
            <div className="grid grid-cols-4 gap-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900 col-span-3">
                Nova meta
              </h3>
              <div className="flex justify-end items-baseline active:bg-none">
                <Link to="/metas">
                  <XIcon className="h-4 w-4"></XIcon>
                </Link>
              </div>
              {action?.error && (
                <div className="col-span-4">
                  <p className="text-red-700">{action.error}</p>
                </div>
              )}
              <div className="col-span-4">
                <TextInput
                  name="nome"
                  placeholder="Nome"
                  label="Nome"
                  hasError={Boolean(
                    action?.fieldErrors && action.fieldErrors["nome"]
                  )}
                  errorMessage={
                    action?.fieldErrors && action?.fieldErrors["nome"]
                  }
                />
              </div>
              <div className="col-span-4">
                <TextInput
                  name="horas"
                  placeholder="Quantidade de horas"
                  label="Quantidade de Horas"
                  hasError={Boolean(
                    action?.fieldErrors && action.fieldErrors["metaDeHoras"]
                  )}
                  errorMessage={
                    action?.fieldErrors && action?.fieldErrors["metaDeHoras"]
                  }
                />
              </div>
              <div className="col-span-4">
                <label
                  htmlFor="horas"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipo
                </label>
                <SelectInput name="tipo">
                  <option value="0">Mínimo</option>
                  <option value="1">Máximo</option>
                </SelectInput>
              </div>
              <div className="mt-4 text-right col-span-4">
                <Button type="submit">Criar</Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <div className="rounded-sm bg-red-400 border-2 p-4">
      Deu uma cagada!
      <p>
        {error.name}: {error.message}
      </p>
    </div>
  );
}
