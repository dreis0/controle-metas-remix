import { XIcon } from "@heroicons/react/outline";
import {
  json,
  Link,
  LoaderFunction,
  Outlet,
  useLoaderData,
  useLocation,
} from "remix";
import { Modal } from "~/components";
import { getMetaById } from "~/features";
import { Meta } from "~/model";

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
  const { meta } = useLoaderData<LoaderData>();
  var location = useLocation();

  const weekActive = location.pathname.includes("week")
    ? "border-purple-700 text-purple-700"
    : "";
  const allActive = location.pathname.includes("all")
    ? "border-purple-700 text-purple-700"
    : "";

  return (
    <Modal>
      <div className="flex justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900 col-span-9 pl-4">
          {meta.descricao}
        </h3>
        <Link
          to="/metas"
          className="col-span-1 flex justify-end items-baseline"
        >
          <XIcon className="h-5 w-5" />
        </Link>
      </div>
      <ul
        className="nav nav-tabs nav-justified flex flex-row flex-wrap
            list-none border-b-0 pl-0 mb-4"
        id="tabs-tabJustify"
        role="tablist"
      >
        <li className="nav-item flex-grow text-center" role="presentation">
          <Link
            to={`${meta.id}/week`}
            prefetch="intent"
            className={`nav-link w-full block font-medium text-sm leading-tight uppercase border-x-0 border-t-0 border-b-2 
                border-gr px-6 py-3 my-2 hover:bg-gray-200 ${weekActive}`}
            id="tabs-home-tabJustify"
            data-bs-toggle="pill"
            data-bs-target="#tabs-homeJustify"
            role="tab"
            aria-controls="tabs-homeJustify"
            aria-selected="true"
          >
            Semana
          </Link>
        </li>
        <li className="nav-item flex-grow text-center" role="presentation">
          <Link
            to={`${meta.id}/all`}
            prefetch="intent"
            className={`nav-link w-full block font-medium text-sm leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent
                px-6 py-3 my-2 hover:bg-gray-200 ${allActive}`}
            id="tabs-profile-tabJustify"
            data-bs-toggle="pill"
            data-bs-target="#tabs-profileJustify"
            role="tab"
            aria-controls="tabs-profileJustify"
            aria-selected="false"
          >
            Todas
          </Link>
        </li>
      </ul>
      <div className="tab-content overflow-y-scroll max-h-screen md:max-h-96" id="tabs-tabContentJustify">
        <Outlet />
      </div>
    </Modal>
  );
}
