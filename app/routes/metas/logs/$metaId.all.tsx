import { json, Link, LoaderFunction, useLoaderData } from "remix";
import { LogHorasCard, Modal } from "~/components";
import { getMetaById } from "~/features";
import { Meta } from "~/model";
import { XIcon } from "@heroicons/react/solid";
import { format } from "date-fns";

type LoaderData = { meta: Meta };

export const loader: LoaderFunction = async ({ request, params }) => {
  const meta = await getMetaById(Number(params.metaId));

  if (!meta) {
    throw new Response("What a joke! Not found.", {
      status: 404,
    });
  }
  const data: LoaderData = {
    meta,
  };

  return json(data);
};

export default function () {
  var { meta } = useLoaderData<LoaderData>();

  const horas =
    meta.horas &&
    meta.horas.sort((x, y) => (new Date(x.data) > new Date(y.data) ? 1 : 0));

  return (
    <div className="grid grid-cols-10 ">
      {horas && horas.length === 0 ? (
        <div className="p-4 text-lg col-span-10 text-center">
          Sem nenhum registros por enquanto
        </div>
      ) : (
        horas?.map((log) => (
          <LogHorasCard log={log} tipoDeMeta={meta.tipoDeMeta} />
        ))
      )}
    </div>
  );
}
