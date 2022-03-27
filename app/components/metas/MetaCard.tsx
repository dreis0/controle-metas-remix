import { Meta } from "~/model";
import { PencilIcon } from "@heroicons/react/outline";

export interface MetaCardProps {
  meta: Meta;
}

export function MetaCard({ meta }: MetaCardProps) {
  var [start, end] = getWeekDates();
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
        <span className="col-span-2 flex justify-end">
          <PencilIcon className="text-sm h-5 w-5" />
        </span>
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

function getWeekDates() {
  let now = new Date();
  let dayOfWeek = now.getDay(); //0-6
  let numDay = now.getDate();

  let start = new Date(now); //copy
  start.setDate(numDay - dayOfWeek);
  start.setHours(0, 0, 0, 0);

  let end = new Date(now); //copy
  end.setDate(numDay + (7 - dayOfWeek));
  end.setHours(23, 59);

  return [start, end];
}
