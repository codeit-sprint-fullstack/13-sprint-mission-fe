import type { ZodType } from "zod";

export function validateSchema<T>(
  schema: ZodType<T>,
  values: unknown,
): Record<string, string[]> {
  const result = schema.safeParse(values);
  if (result.success) return {};
  return result.error.flatten().fieldErrors as Record<string, string[]>;
}
