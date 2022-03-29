import { format } from "date-fns";
import { LogHora } from "~/model";

export interface LogHorasCardProps {
  log: LogHora;
  tipoDeMeta: number;
}

export function LogHorasCard({ log, tipoDeMeta }: LogHorasCardProps) {
  const borderColor =
    tipoDeMeta === 0 ? "border-green-400" : "border-orange-400";

  return (
    <div
      className={`${borderColor} p-4 mr-2 pb-2 col-span-10 rounded-md border-gray-500 flex flex-col bg-white 
      border-l-4 md:px-2 md:py-4 md:mr-0 md:rounded-none mb-2`}
    >
      <p className="col-span-12 mb-2">
        + {log.horas}{" "}
        {log.horas === 1 ? "hora adicionada" : "horas adicionadas"}{" "}
      </p>
      <p className="col-span-6 col-end-6 text-sm sm:text-xs">
        {format(new Date(log.data), "dd/MM/yyyy")} às{" "}
        {format(new Date(log.data), "hh:mm")}
      </p>
    </div>
  );
}
