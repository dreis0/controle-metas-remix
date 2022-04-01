import { XIcon } from "@heroicons/react/outline";
import {
  ActionFunction,
  Form,
  json,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import { Button, Modal, TextInput } from "~/components";
import { addHoras, getMetaById } from "~/features";
import { Meta } from "~/model";

type LoaderData = { meta: Meta };
export const loader: LoaderFunction = async ({ params }) => {
  const meta = await getMetaById(Number(params.metaId));

  const data: LoaderData = {
    meta,
  };
  return json(data);
};

export const action: ActionFunction = async ({ request, params }) => {
  const metaId = Number(params.metaId);
  const form = await request.formData();
  const horas = Number(form.get("horas"));

  await addHoras({ metaId, horas });

  return redirect("metas");
};

export default function () {
  const { meta } = useLoaderData<LoaderData>();

  return (
    <Modal>
      <div className="grid grid-cols-10">
        <h3 className="col-span-9 text-lg font-semibold">
          {meta.descricao} - Adicionar horas
        </h3>
        <Link to="/metas" className="col-span-1 flex justify-end">
          <XIcon className="w-5 h-5" />
        </Link>
        <Form method="post" className="py-2 col-span-10">
          <div className="col-span-10">
            <TextInput name="horas" type="number" label="Horas"></TextInput>
          </div>
          <div className="mt-4 text-right col-span-10">
            <Button type="submit">Adicionar</Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
