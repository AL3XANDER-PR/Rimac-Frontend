import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface CheckboxFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  error?: string;
}

export const CheckboxField = <T extends FieldValues>({
  name,
  label,
  control,
  error,
}: CheckboxFieldProps<T>) => {
  return (
    <label
      className={`relative flex items-center gap-3 cursor-pointer mt-4 ${
        error ? "text-red-500" : "text-gray-700"
      }`}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="checkbox"
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            className="sr-only peer"
          />
        )}
      />

      <div
        className={`w-5 h-5 border ${
          error ? "border-red-500" : "border-gray-400"
        } rounded-sm flex items-center justify-center peer-checked:bg-black`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="white"
          className="w-3 h-3 peer-checked:opacity-0 opacity-100 transition "
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <span className="font-br-sonoma-medium">{label}</span>

      {/* {error && (
        <p className="text-red-500 text-xs absolute top-full left-0 mt-1">
          {error}
        </p>
      )} */}
    </label>
  );
};
