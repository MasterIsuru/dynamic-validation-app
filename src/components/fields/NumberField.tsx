import { ChangeEvent } from "react";
import { FieldType, ValidationRule } from "../../store/form.ts";
import { TextField, TextFieldProps } from "@mui/material";
import useFormValidate from "../../hooks/useFormValidate";

type NumberFieldProps = Omit<TextFieldProps, "onChange"> & {
  label: string;
  value: string;
  rules?: ValidationRule[];
  onChange: (value: string) => void;
};

export const NumberField = ({
  label,
  value,
  rules,
  onChange,
  required,
  ...rest
}: NumberFieldProps) => {
  const { error, helperText, validateField } = useFormValidate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleValidate = () => {
    validateField(FieldType.Number, label, value, required, rules);
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      margin="normal"
      type="number"
      error={error}
      required={required}
      helperText={helperText}
      onBlur={handleValidate}
      {...rest}
    />
  );
};
