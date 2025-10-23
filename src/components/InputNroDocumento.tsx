import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { PatternFormat } from "react-number-format";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  options: Option[];
  error?: string;
}

export const SelectField = <T extends FieldValues>({
  name,
  control,
  options,
  error,
}: SelectFieldProps<T>) => {
  return (
    <div className="flex w-full flex-col">
      <div className="relative flex items-center  border-gray-400 border-r-0  rounded-l-lg  h-14 text-gray-700 text-[16px] font-normal bg-white">
        <div
          className={`relative flex items-center border  ${
            error ? "border-red-500" : "border-gray-400"
          } border-r-0 bg-white rounded-l-lg h-14 text-gray-700 text-[16px] font-normal`}
        >
          <select className="appearance-none cursor-pointer bg-transparent h-full pl-4 pr-10 outline-none min-w-[140px]">
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-4 w-4 h-4 text-gray-500 pointer-events-none"
            viewBox="0 0 448 512"
            fill="currentColor"
          >
            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
          </svg>
        </div>

        <div
          className={`relative flex-1 border rounded-r-lg border-blue-500 bg-white h-14 ${
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
                format="########"
                mask=""
                placeholder=" "
                className="peer w-full h-full px-4 pt-5 pb-1 text-gray-800 outline-none bg-transparent rounded-lg"
                onValueChange={(values) => field.onChange(values.value)} // ✅ solo los dígitos
              />
            )}
          />

          <label
            htmlFor={name}
            className="absolute left-4 top-1/2 text-gray-500 text transform -translate-y-1/2 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-xs peer-focus:text-gray-600 peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-600 font-br-sonoma-medium"
          >
            Nro. de documento
          </label>
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
