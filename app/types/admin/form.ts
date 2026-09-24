export type FieldType = "text" | "textarea" | "select" | "number" | "file" | "checkbox";

export type FieldOption = {
  label: string;
  value: string | number;
};

export type FormFieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[];      // select ko lagi
  accept?: string;              // file ko lagi
  rows?: number;                // textarea ko lagi
  colSpan?: 1 | 2;              // grid layout
};

export type DynamicFormProps<T> = {
  fields: FormFieldConfig[];
  schema: any;                  // yup schema
  defaultValues?: Partial<T>;
  onSubmit: (data: T) => void;
  isPending?: boolean;
  isEdit?: boolean;
  title: string;
  description?: string;
  submitLabel?: string;
  onCancel?: () => void;
};