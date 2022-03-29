import { Meta } from "~/model";
import { CalendarIcon } from "@heroicons/react/outline";
import { Link } from "remix";
import { getWeekBoundaries } from "~/utils";

export interface MetaCardProps {
  meta: Meta;
}

export function MetaCard({ meta }: MetaCardProps) {
  var [start, end] = getWeekBoundaries();
  var logsNaSemana =
    meta.horas &&
    meta.horas.filter(
      (log) => new Date(log.data) >= start && new Date(log.data) <= end
    );

  var horasNaSemana =
    logsNaSemana &&
    logsNaSemana.map((x) => x.horas).reduce((acc, x) => acc + x, 0);

  var percentage = (horasNaSemana ?? 0) / meta.metaDeHoras;

  var progressColumns = Math.floor(percentage * 10);
  var progressColor = getProgressColorClass(meta.tipoDeMeta, progressColumns);

  return (
    <div className="mb-4 grid rounded-md shadow-sm grid-cols-10 mt-4 bg-white">
      <div className="p-4 col-span-10 grid grid-cols-10">
        <div className="col-span-8 w-full justify-center">
          <h2 className="font-semibold text-lg">{meta.descricao}</h2>
        </div>
        <Link to={`logs/${meta.id}/week`} className="col-span-2 flex justify-end">
          <CalendarIcon className="text-sm h-5 w-5" />
        </Link>
        <span className="col-span-10 w-full">
          Meta: {meta.tipoDeMeta === 0 ? "Mínimo de " : "Máximo de "}
          {meta.metaDeHoras} horas
        </span>
        <span className="col-span-10">
          {horasNaSemana ?? 0}/{meta.metaDeHoras}
        </span>
      </div>
      {(horasNaSemana ?? 0) > 0 && (
        <span
          className={`col-span-${progressColumns} ${progressColor} h-1 rounded-bl-sm rounded-br-sm`}
        ></span>
      )}
      {(horasNaSemana ?? 0) === 0 && (
        <span
          className={`w-4 ${progressColor} h-1 rounded-bl-sm rounded-br-sm`}
        ></span>
      )}
    </div>
  );
}

function getProgressColorClass(tipo: number, percentage: number) {
  if (percentage <= 4) return tipo === 0 ? "bg-red-700" : "bg-green-700";

  if (percentage >= 8) return tipo === 0 ? "bg-green-700" : "bg-red-700";

  return "bg-yellow-700";
}


