import { TextField, TextFieldProps } from "@mui/material";
import { FieldType, ValidationRule } from "../../store/form.ts";
import useFormValidate from "../../hooks/useFormValidate";

type DateFieldProps = Omit<TextFieldProps, "onChange"> & {
  label: string;
  value: string;
  rules?: ValidationRule[];
  onChange: (value: string) => void;
};

export const DateField = ({
  label,
  value,
  rules,
  onChange,
  required,
  ...rest
}: DateFieldProps) => {
  const { error, helperText, validateField } = useFormValidate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleValidate = () => {
    validateField(FieldType.Date, label, value, required, rules);
  };

  return (
    <TextField
      label={label}
      type="date"
      value={value}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
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
