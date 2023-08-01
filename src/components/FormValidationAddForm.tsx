import { useState, useEffect } from "react";
import { Dropdown } from "./fields/Dropdown.tsx";
import {
  FieldType,
  ValidationRule,
  NumberValidationTypes,
  StringValidationTypes,
} from "../store/form.ts";
import { Box, Grid, Button, Typography } from "@mui/material";
import { DateField } from "./fields/DateField.tsx";
import { InputField } from "./fields/InputField.tsx";
import { NumberField } from "./fields/NumberField.tsx";
import {
  DATE_REGEX,
  EMAIL_REGEX,
  PHONE_NUMBER_REGEX,
  STRONG_PASSWORD_REGEX,
} from "../utils/regex.ts";
import {
  VALID_DATE_MESSAGE,
  VALID_EMAIL_MESSAGE,
  STRONG_PASSWORD_MESSAGE,
  VALID_PHONE_NUMBER_MESSAGE,
} from "../utils/messages.ts";
import { sortArrayById } from "../utils/helpers.ts";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type FormProps = {
  fieldType: string;
  validations: ValidationRule[];
  currentItem: ValidationRule | null;
  setCurrentTab: (value: string) => void;
  setValidations: (value: ValidationRule[]) => void;
};

export const FormValidationAddForm = ({
  fieldType,
  currentItem,
  validations,
  setCurrentTab,
  setValidations,
}: FormProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [currentName, setCurrentName] = useState("");
  const [currentType, setCurrentType] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");

  const resetFormFields = () => {
    setCurrentId(0);
    setIsEdit(false);
    setCurrentName("");
    setCurrentType("");
    setCurrentValue("");
    setCurrentMessage("");
  };

  const onChangeRegex = (value: string) => {
    let regexValue = "";
    let regexMessage = "";
    switch (value) {
      case StringValidationTypes.Date:
        regexValue = DATE_REGEX.toString();
        regexMessage = VALID_DATE_MESSAGE;
        break;
      case StringValidationTypes.Email:
        regexValue = EMAIL_REGEX.toString();
        regexMessage = VALID_EMAIL_MESSAGE;
        break;
      case StringValidationTypes.PhoneNumber:
        regexValue = PHONE_NUMBER_REGEX.toString();
        regexMessage = VALID_PHONE_NUMBER_MESSAGE;
        break;
      case StringValidationTypes.StrongPassword:
        regexValue = STRONG_PASSWORD_REGEX.toString();
        regexMessage = STRONG_PASSWORD_MESSAGE;
        break;
      default:
        break;
    }
    setCurrentValue(regexValue);
    setCurrentMessage(regexMessage);
  };

  const onSubmit = () => {
    if (!currentName || !currentType || !currentValue || !currentMessage) {
      return;
    }
    if (isEdit) {
      const filtered = validations.filter(
        (validation: ValidationRule) => validation.id !== currentId
      );
      const sorted = sortArrayById([
        ...filtered,
        {
          id: currentId,
          type: currentType,
          name: currentName,
          value: currentValue,
          message: currentMessage,
        },
      ]);
      setValidations(sorted);
      resetFormFields();
      setCurrentTab("list");
      return;
    }
    setValidations([
      ...validations,
      {
        id: Date.now(),
        type: currentType,
        name: currentName,
        value: currentValue,
        message: currentMessage,
      },
    ]);
    resetFormFields();
    setCurrentTab("list");
  };

  useEffect(() => {
    if (currentItem) {
      setIsEdit(true);
      setCurrentId(currentItem.id);
      setCurrentName(currentItem.name);
      setCurrentType(currentItem.type);
      setCurrentValue(currentItem.value);
      setCurrentMessage(currentItem.message);
    } else {
      resetFormFields();
    }
  }, [currentItem]);

  const renderAdditionalFields = () => {
    switch (fieldType) {
      case FieldType.Number:
        return (
          <>
            <Grid item xs={12}>
              <Dropdown
                label="Choose a validation type"
                value={currentType}
                onChange={(type) => {
                  setCurrentType(type);
                  onChangeRegex(type);
                }}
                options={{
                  "Greater Than ( > )": NumberValidationTypes.GreaterThan,
                  "Greater Than Or Equals To ( >= )":
                    NumberValidationTypes.GreaterThanOrEqualsTo,
                  "Less Than ( < )": NumberValidationTypes.LessThan,
                  "Less Than Or Equals To ( <= )":
                    NumberValidationTypes.LessThanOrEqualsTo,
                  "Equal ( == )": NumberValidationTypes.Equal,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <NumberField
                onChange={(value) => setCurrentValue(value)}
                label="Value"
                value={currentValue}
              />
            </Grid>
          </>
        );
      case FieldType.Date:
        return (
          <>
            <Grid item xs={12}>
              <Dropdown
                label="Choose a validation type"
                value={currentType}
                onChange={(type) => {
                  setCurrentType(type);
                  onChangeRegex(type);
                }}
                options={{
                  "Greater Than ( > )": NumberValidationTypes.GreaterThan,
                  "Greater Than Or Equals To ( >= )":
                    NumberValidationTypes.GreaterThanOrEqualsTo,
                  "Less Than ( < )": NumberValidationTypes.LessThan,
                  "Less Than Or Equals To ( <= )":
                    NumberValidationTypes.LessThanOrEqualsTo,
                  "Equal ( == )": NumberValidationTypes.Equal,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <DateField
                onChange={(value) => setCurrentValue(value)}
                label="Date"
                value={currentValue}
              />
            </Grid>
          </>
        );
      case FieldType.String:
        return (
          <>
            <Grid item xs={12}>
              <Dropdown
                label="Choose a validation type"
                value={currentType}
                onChange={(type) => {
                  setCurrentType(type);
                  onChangeRegex(type);
                }}
                options={{
                  Email: StringValidationTypes.Email,
                  StrongPassword: StringValidationTypes.StrongPassword,
                  Date: StringValidationTypes.Date,
                  PhoneNumber: StringValidationTypes.PhoneNumber,
                  Custom: StringValidationTypes.Custom,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                onChange={(value) => setCurrentValue(value)}
                multiline
                rows={3}
                label="Validation regex"
                value={currentValue}
                disabled={currentType !== StringValidationTypes.Custom}
              />
            </Grid>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={style}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ marginBottom: 20 }}>
          <Typography variant="h6">
            {isEdit ? "Edit" : "Add"} validation rule
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <InputField
            onChange={(value) => setCurrentName(value)}
            placeholder="Ex - Email validation"
            label="Validation name"
            value={currentName}
          />
        </Grid>
        {renderAdditionalFields()}
        <Grid item xs={12}>
          <InputField
            onChange={(value) => setCurrentMessage(value)}
            label="Validation message"
            value={currentMessage}
          />
        </Grid>
        <Grid item xs={12} textAlign="right" style={{ marginTop: 20 }}>
          <Button
            style={{ marginRight: 10 }}
            variant="text"
            onClick={() => {
              resetFormFields();
              setCurrentTab("list");
            }}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            {isEdit ? "Edit" : "Add"} rule
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
