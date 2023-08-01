import { ChangeEvent } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { FieldType, ValidationRule } from "../../store/form.ts";
import useFormValidate from "../../hooks/useFormValidate";

type InputFieldProps = Omit<TextFieldProps, "onChange"> & {
  label: string;
  value: string;
  rules?: ValidationRule[];
  onChange: (value: string) => void;
};

export const InputField = ({
  label,
  value,
  rules,
  onChange,
  required,
  ...rest
}: InputFieldProps) => {
  const { error, helperText, validateField } = useFormValidate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleValidate = () => {
    validateField(FieldType.String, label, value, required, rules);
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      margin="normal"
      error={error}
      required={required}
      helperText={helperText}
      onBlur={handleValidate}
      {...rest}
    />
  );
};
