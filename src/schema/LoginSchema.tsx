import z from "zod";

export const LoginSchema = z
  .object({
    documentType: z.string(),
    documentNumber: z
      .string()
      .nonempty("El número de Documento es obligatorio"),
    // .min(8, "El número de Documento debe tener 8 dígitos"),
    nroCelular: z
      .string()
      .nonempty("El número de Celular es obligatorio")
      .min(9, "El número de Celular debe tener 9 dígitos"),
    acceptPrivacy: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar la política de privacidad",
    }),
    acceptComms: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar los términos y condiciones",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.documentType === "DNI" && data.documentNumber.length !== 8) {
      ctx.addIssue({
        path: ["documentNumber"],
        message: "El número de Documento debe tener 8 dígitos si es DNI",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.documentType === "RUC" && data.documentNumber.length !== 11) {
      ctx.addIssue({
        path: ["documentNumber"],
        message: "El número de Documento debe tener 11 dígitos si es RUC",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type FormData = z.infer<typeof LoginSchema>;
