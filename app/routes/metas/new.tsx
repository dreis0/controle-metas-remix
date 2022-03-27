import { ActionFunction, Form, redirect, useActionData } from "remix";
import { createMeta } from "~/features";
import { Response } from "~/features/Response";
import { badRequest } from "~/utils";
import { SelectInput, TextInput } from "../../components";

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
  console.log(action);
  return (
    <>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Nova meta
            </h3>
            <p className="mt-1 text-sm text-gray-600">Crie sua nova meta</p>
          </div>
        </div>
      </div>
      <div className="mt-5 md:col-span-2 ">
        <Form method="post">
          <div className="shadow rounded-sm sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="grid grid-cols-4 gap-4">
                {action?.error && (
                  <div className="col-span-4">
                    <p className="text-red-700">{action.error}</p>
                  </div>
                )}
                <div className="col-span-4 ">
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
                  <SelectInput
                    name="tipo"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white 
                        rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="0">Mínimo</option>
                    <option value="1">Máximo</option>
                  </SelectInput>
                </div>
                <div className="mt-4 text-right col-span-4">
                  <button
                    type="submit"
                    className="inline-flex justify-end py-2 px-4 border border-transparent shadow-sm 
                      text-sm font-medium rounded-md text-white bg-purple-700 hover:bg-purple-500"
                  >
                    Criar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
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
