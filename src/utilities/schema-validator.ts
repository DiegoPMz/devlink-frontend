import z from "zod";

interface SchemaValidatorResponse<E> {
  isError: boolean;
  schemaError: null | z.ZodFormattedError<E>;
}

const schemaValidator = <T>(
  schema: z.ZodSchema<T>,
  data: T,
): SchemaValidatorResponse<T> => {
  const schemaResult = schema.safeParse(data);

  if (schemaResult.success) return { isError: false, schemaError: null };
  return { isError: true, schemaError: schemaResult.error.format() };
};

export default schemaValidator;
