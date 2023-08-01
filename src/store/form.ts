import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum FieldType {
  Number = "number",
  String = "string",
  Date = "date",
  Boolean = "boolean",
}

export enum NumberValidationTypes {
  GreaterThan = ">",
  GreaterThanOrEqualsTo = ">=",
  LessThan = "<",
  LessThanOrEqualsTo = "<=",
  Equal = "==",
}

export enum StringValidationTypes {
  Email = "email",
  Date = "date",
  StrongPassword = "password",
  PhoneNumber = "phoneNumber",
  Custom = "custom",
}

export type ValidationRule = {
  id: number;
  name: string;
  type: string;
  value: string;
  message: string;
};

type Field = {
  key: string;
  type: FieldType;
  label: string;
  value: string;
  isRequired: string;
  rules: ValidationRule[];
};

export interface FormState {
  fields: { [key: string]: Field };
}

const initialState: FormState = {
  fields: {},
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addField: (
      state: FormState,
      action: PayloadAction<{
        key: string;
        type: FieldType;
        label: string;
        isRequired: string;
        rules: ValidationRule[];
      }>
    ) => {
      const { key, type, label, rules, isRequired } = action.payload;

      state.fields[key] = {
        key,
        type,
        label,
        rules,
        value: "",
        isRequired,
      };
    },
    setValue: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;
      const field = state.fields[key];

      field.value = value;
    },
  },
});

export const { addField, setValue } = formSlice.actions;
export const formReducer = formSlice.reducer;
