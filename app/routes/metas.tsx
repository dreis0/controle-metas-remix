import { Link, Outlet } from "remix";
import { LoaderFunction, json, useCatch, useLoaderData } from "remix";
import { MetaCard } from "~/components";
import { getMetas } from "~/features";
import { Meta } from "~/model";

type LoaderData = { data: Meta[] };

export const loader: LoaderFunction = async () => {
  var metas = await getMetas();
  var data: LoaderData = { data: metas };
  return json(data);
};

export default function MetasIndex() {
  var { data } = useLoaderData<LoaderData>();
  
  return (
    <div className="px-4 md:px-16">
      <h1 className="py-4 text-2xl">Metas</h1>
      <Link to="new">
        <div className="p-2 bg-white rounded-md shadow-sm mb-4 text-center font-bold text-lg hover:shadow-md">
          + Nova
        </div>
      </Link>
      {data.map((meta) => (
        <MetaCard key={meta.id} meta={meta}></MetaCard>
      ))}
      <Outlet />
    </div>
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

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="rounded-sm bg-red-400 border-2 p-4">
      Deu uma cagada!
      <p>
        {caught.status}: {caught.data}
      </p>
    </div>
  );
}
