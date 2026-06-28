export function validateSchema(schema, values) {
  const result = schema.safeParse(values);
  if (result.success) return {};
  return result.error.flatten().fieldErrors;
}
