import { Outlet } from "remix";

export default function () {
  return (
    <div className="container mx-auto p-4">
      <Outlet />
    </div>
  );
}