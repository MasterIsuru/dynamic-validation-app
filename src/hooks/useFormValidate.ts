import { useState } from "react";
import {
  FieldType,
  ValidationRule,
  NumberValidationTypes,
} from "../store/form.ts";
import { SLASH_REMOVE_REGEX } from "../utils/regex.ts";
import { REQUIRED_MESSAGE } from "../utils/messages";

const useFormValidate = () => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const validateRegex = async (value: string, rules: ValidationRule[]) => {
    let errorStatus = false;
    let errorMessage = "";
    rules.every((item: ValidationRule) => {
      const regex = item.value.replace(SLASH_REMOVE_REGEX, "");
      const reg = new RegExp(regex);
      if (!reg.test(value)) {
        errorStatus = true;
        errorMessage = item?.message;
        return false;
      }
      return true;
    });
    setError(errorStatus);
    setHelperText(errorMessage);
  };

  const validateDate = async (value: string, rules: ValidationRule[]) => {
    let errorStatus = false;
    let errorMessage = "";
    rules.every((item: ValidationRule) => {
      const formValue = new Date(value);
      const validationValue = new Date(item.value);
      switch (item.type) {
        case NumberValidationTypes.GreaterThan:
          if (formValue.getTime() <= validationValue.getTime()) {
            errorStatus = true;
            errorMessage = item?.message;
          }
          return false;
        case NumberValidationTypes.GreaterThanOrEqualsTo:
          if (formValue.getTime() < validationValue.getTime()) {
            errorStatus = true;
            errorMessage = item?.message;
          }
          return false;
        case NumberValidationTypes.LessThan:
          if (formValue.getTime() >= validationValue.getTime()) {
            errorStatus = true;
            errorMessage = item?.message;
          }
          return false;
        case NumberValidationTypes.LessThanOrEqualsTo:
          if (formValue.getTime() > validationValue.getTime()) {
            errorStatus = true;
            errorMessage = item?.message;
          }
          return false;
        case NumberValidationTypes.Equal:
          if (formValue.getTime() !== validationValue.getTime()) {
            errorStatus = true;
            errorMessage = item?.message;
          }
          return false;
        default:
          return true;
      }
    });
    setError(errorStatus);
    setHelperText(errorMessage);
  };

  const validateNumber = async (value: string, rules: ValidationRule[]) => {
    let errorStatus = false;
    let errorMessage = "";
    rules.every((item: ValidationRule) => {
      switch (item.type) {
        case NumberValidationTypes.GreaterThan:
          if (value <= item.value) {
            errorStatus = true;
            errorMessage = item?.message;
          }
          return false;
        case NumberValidationTypes.GreaterThanOrEqualsTo:
          if (value < item.value) {
            errorStatus = true;
            errorMessage = item?.message;
          }
          return false;
        case NumberValidationTypes.LessThan:
          if (value >= item.value) {
            errorStatus = true;
            errorMessage = item?.message;
          }
          return false;
        case NumberValidationTypes.LessThanOrEqualsTo:
          if (value > item.value) {
            errorStatus = true;
            errorMessage = item?.message;
          }
          return false;
        case NumberValidationTypes.Equal:
          if (value !== item.value) {
            errorStatus = true;
            errorMessage = item?.message;
          }
          return false;
        default:
          return true;
      }
    });
    setError(errorStatus);
    setHelperText(errorMessage);
  };

  const validateRequired = async (label: string, value: string) => {
    if (!value) {
      setError(true);
      setHelperText(`${label} ${REQUIRED_MESSAGE}`);
      return false;
    } else {
      setError(false);
      setHelperText("");
      return true;
    }
  };

  const onValidate = async (
    fieldType: string,
    value: string,
    rules?: ValidationRule[]
  ) => {
    if (!rules?.length) {
      return;
    }
    if (!value) {
      setError(false);
      setHelperText("");
      return;
    }
    switch (fieldType) {
      case FieldType.String:
        validateRegex(value, rules);
        break;
      case FieldType.Number:
        validateNumber(value, rules);
        break;
      case FieldType.Date:
        validateDate(value, rules);
        break;
      default:
        break;
    }
  };

  const validateField = async (
    fieldType: string,
    label: string,
    value: string,
    required?: boolean,
    rules?: ValidationRule[]
  ) => {
    if (required) {
      const isRequiredValid = await validateRequired(label, value);
      if (isRequiredValid) {
        onValidate(fieldType, value, rules);
      }
    } else {
      onValidate(fieldType, value, rules);
    }
  };

  return { error, helperText, validateField };
};

export default useFormValidate;
