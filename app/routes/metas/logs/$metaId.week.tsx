import { json, Link, LoaderFunction, useLoaderData } from "remix";
import { LogHorasCard, Modal } from "~/components";
import { getMetaById } from "~/features";
import { Meta } from "~/model";
import { XIcon } from "@heroicons/react/solid";
import { getWeekBoundaries } from "~/utils";

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

  const [start] = getWeekBoundaries();
  const horas =
    meta.horas && meta.horas.filter((x) => new Date(x.data) >= start);

  return (
    <div
      className="tab-pane fade show active"
      id="week"
      role="tabpanel"
      aria-labelledby="tabs-home-tabJustify"
    >
      <div className="grid grid-cols-10">
        {meta.horas && meta.horas.length === 0 ? (
          <div className="p-4 text-lg col-span-10 text-center">
            Sem nenhum registros por enquanto
          </div>
        ) : (
          horas &&
          horas.map((log) => (
            <LogHorasCard tipoDeMeta={meta.tipoDeMeta} log={log} />
          ))
        )}
      </div>
    </div>
  );
}
