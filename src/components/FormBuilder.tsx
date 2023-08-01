import { Dropdown } from "./fields/Dropdown.tsx";
import { CheckboxField } from "./fields/CheckboxField.tsx";
import { useState } from "react";
import { addField, FieldType, ValidationRule } from "../store/form.ts";
import { Button, Grid, Link, Typography } from "@mui/material";
import { InputField } from "./fields/InputField.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/config.ts";
import { FormValidationBuilderModal } from "./FormValidationBuilderModal.tsx";

export const FormBuilder = () => {
  const [currentKey, setCurrentKey] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [currentLabel, setCurrentLabel] = useState("");
  const [currentIsRequired, setCurrentIsRequired] = useState("");
  const [validations, setValidations] = useState<ValidationRule[]>([]);

  const dispatch = useDispatch();
  const { fields } = useSelector((state: RootState) => state.form);

  const handleAddingField = () => {
    if (fields[currentKey] !== undefined) {
      alert("Key already exists");
      return;
    }

    if (currentType && currentKey && currentLabel) {
      dispatch(
        addField({
          key: currentKey,
          type: currentType as FieldType,
          label: currentLabel,
          isRequired: currentIsRequired,
          rules: validations,
        })
      );
      setCurrentIsRequired("");
      setCurrentLabel("");
      setCurrentType("");
      setValidations([]);
      setCurrentKey("");
    }
  };

  return (
    <Grid container spacing={2} sx={{ width: 300, margin: "auto" }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Form Builder
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Dropdown
          label="Choose a field type"
          value={currentType}
          onChange={(type) => {
            setCurrentType(type);
            setValidations([]);
          }}
          options={{
            Number: FieldType.Number,
            String: FieldType.String,
            Date: FieldType.Date,
            Boolean: FieldType.Boolean,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          onChange={(value) => setCurrentKey(value)}
          label="Key"
          value={currentKey}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          onChange={(value) => setCurrentLabel(value)}
          label="Label"
          value={currentLabel}
        />
      </Grid>
      {currentType && currentType !== FieldType.Boolean && (
        <Grid textAlign="left" item xs={12}>
          <CheckboxField
            label="Is Required"
            onChange={(value) => setCurrentIsRequired(value)}
            value={currentIsRequired}
          />
          <Link
            component="button"
            variant="body2"
            style={{ marginLeft: 25 }}
            onClick={() => setModalOpen(true)}
          >
            Add validation rules
          </Link>
        </Grid>
      )}
      <FormValidationBuilderModal
        open={modalOpen}
        setOpen={setModalOpen}
        fieldType={currentType}
        validations={validations}
        setValidations={setValidations}
      />
      <Grid item xs={12} style={{ marginTop: 20 }}>
        <Button variant="contained" color="primary" onClick={handleAddingField}>
          Add Field
        </Button>
      </Grid>
    </Grid>
  );
};
