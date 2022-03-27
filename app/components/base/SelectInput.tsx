export interface SelectInputProps extends React.PropsWithChildren<any> {
  name: string;
  placeholder?: string;
  value?: string;
}

export function SelectInput({
  name,
  placeholder,
  value,
  children,
}: SelectInputProps) {
  return (
    <select
      name={name}
      placeholder={placeholder}
      className="mt-1 rounded-md flex-1 block w-full 
          border-gray-300 focus:ring-purple-700 focus:border-purple-700 sm:text-sm "
      value={value}
    >
      {children}
    </select>
  );
}
