import {
  type FieldValues,
  type Path,
  Controller,
  type Control,
} from "react-hook-form";
import { PatternFormat } from "react-number-format";

interface InputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  error?: string;
  step?: string;
  min?: number;
  max?: number;
  control: Control<T>;
}

export const InputNumber = <T extends FieldValues>({
  label,
  name,
  control,
  error,
}: InputProps<T>) => {
  return (
    <>
      <div
        className={`relative w-full flex-1 border rounded-lg bg-white h-14 p-1 mt-4 ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <PatternFormat
              {...field}
              id={name}
              format="#########"
              mask=""
              placeholder=" "
              className="peer w-full h-full px-4 pt-5 pb-1 text-gray-800 outline-none bg-transparent rounded-lg"
              onValueChange={(values) => field.onChange(values.value)} // ✅ solo los dígitos
            />
          )}
        />

        <label
          htmlFor={name}
          className="absolute left-5 top-1/3 text-gray-500 text-sm transform -translate-y-1/2 transition-all duration-200
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
          peer-focus:top-3 peer-focus:text-xs peer-focus:text-gray-600
          peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600
          font-br-sonoma-medium"
        >
          {label}
        </label>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
};
