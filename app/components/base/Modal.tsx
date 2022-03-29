import React from "react";

//Modal para telas grandes, tela cheia para tela menores
export function Modal({ children }: React.PropsWithChildren<any>) {
  return (
    <div className="md:bg-gray-500 md:bg-opacity-70 md:w-screen md:h-screen md:fixed md:inset-0 md:flex md:justify-center md:items-center md:max-h-full">
      <div
        className="fixed z-10 inset-0 px-4 py-5 bg-gray-200 sm:p-6 space-y-6 
        md:bg-white md:h-fit md:w-2/3 md:sticky md:rounded-md"
        style={{ maxHeight: "80%" }}
      >
        {children}
      </div>
    </div>
  );
}
