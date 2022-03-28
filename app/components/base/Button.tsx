export interface ButtonProps {
  type: "button" | "reset" | "submit";
  children: any
}

export function Button({ type, children }: ButtonProps) {
  return (
    <button
      type={type}
      className="inline-flex justify-end py-2 px-4 border border-transparent shadow-sm 
        text-sm font-medium rounded-md text-white bg-purple-700 hover:bg-purple-500"
    >
      {children}
    </button>
  );
}
