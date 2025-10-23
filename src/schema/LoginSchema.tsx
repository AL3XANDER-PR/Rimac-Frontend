import z from "zod";

export const LoginSchema = z.object({
  documentType: z.string(),
  documentNumber: z
    .string()
    .nonempty("El número de Documento es obligatorio")
    .min(8, "El número de Documento debe tener 8 dígitos"),
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
});

export type FormData = z.infer<typeof LoginSchema>;
