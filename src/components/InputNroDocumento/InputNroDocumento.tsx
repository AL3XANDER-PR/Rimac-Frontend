import {
  Controller,
  useWatch,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { PatternFormat } from "react-number-format";

import "./InputNroDocumento.scss";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  selectName: Path<T>;
  label?: string;
  control: Control<T>;
  options: Option[];
  error?: string;
}

export const SelectField = <T extends FieldValues>({
  name,
  selectName,
  control,
  options,
  error,
}: SelectFieldProps<T>) => {
  const documentType = useWatch({
    control,
    name: selectName,
  });

  // 📄 Define el formato dinámico según el tipo de documento
  const getFormat = () => {
    switch (documentType) {
      case "RUC":
        return "###########"; // 11 dígitos
      case "DNI":
        return "########"; // 8 dígitos
      default:
        return "########"; // valor por defecto
    }
  };

  return (
    <div className={`select-field ${error ? "has-error" : ""}`}>
      <div className={`select-field__container `}>
        <div className="select-field__select-wrapper">
          <Controller
            name={selectName}
            control={control}
            render={({ field }) => (
              <select className="select-field__select" {...field}>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="select-field__icon"
            viewBox="0 0 448 512"
            fill="currentColor"
          >
            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
          </svg>
        </div>

        <div className="select-field__input-wrapper">
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <PatternFormat
                {...field}
                id={name}
                format={getFormat()}
                mask=""
                placeholder=" "
                className="select-field__input peer"
                onValueChange={(values) => field.onChange(values.value)}
              />
            )}
          />

          <label
            htmlFor={name}
            className="select-field__label font-br-sonoma-medium"
          >
            Nro. de documento
          </label>
        </div>
      </div>

      {error && <p className="select-field__error">{error}</p>}
    </div>
  );
};
