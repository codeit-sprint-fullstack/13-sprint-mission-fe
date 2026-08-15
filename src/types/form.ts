export interface FieldValidator {
  fn: (input: string) => boolean;
  message: string;
}

export interface FieldActiveCondition {
  fn: (input: string | string[]) => boolean;
}

export type FieldStatusUpdate = Record<string, boolean>;
