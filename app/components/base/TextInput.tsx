export interface TextInputProps {
  name: string;
  placeholder?: string;
  label?: string;
  type?: "text" | "number";
  hasError?: boolean;
  errorMessage?: string;
}

export function TextInput({
  name,
  placeholder,
  type,
  hasError,
  errorMessage,
  label,
}: TextInputProps) {
  var errorClass = hasError ? "border-red-700" : "border-gray-300";

  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        <input
          name={name}
          type={type ?? "text"}
          placeholder={placeholder}
          className={`mt-1 rounded-md flex-1 block w-full  ${errorClass}
          focus:ring-purple-700 focus:border-purple-700 sm:text-sm`}
          aria-invalid={hasError}
          aria-errormessage={errorMessage}
        />
      </label>
      {hasError && errorMessage && (
        <p className="text-red-700" role="alert">
          {errorMessage}
        </p>
      )}
    </>
  );
}
