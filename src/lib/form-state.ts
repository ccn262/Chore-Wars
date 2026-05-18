export type FormState = {
  status: "idle" | "error" | "success";
  message: string;
  data?: Record<string, string>;
};

export const initialFormState: FormState = {
  status: "idle",
  message: "",
};
