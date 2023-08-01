import { FieldType } from "../store/form.ts";

const Headers = {
  value: "Value",
  action: "Action",
  ruleName: "Rule name",
  validationType: "Validation type",
  validationRegex: "Validation regex",
  validationMessage: "Validation message",
};

const FieldKeys = {
  name: "name",
  type: "type",
  value: "value",
  message: "message",
};

const StringTypeTableMetaData = {
  headers: [
    {
      id: 1,
      label: Headers.ruleName,
    },
    {
      id: 2,
      label: Headers.validationType,
    },
    {
      id: 3,
      label: Headers.validationRegex,
    },
    {
      id: 4,
      label: Headers.validationMessage,
    },
    {
      id: 5,
      label: Headers.action,
    },
  ],
  rows: [
    {
      id: 1,
      key: FieldKeys.name,
    },
    {
      id: 2,
      key: FieldKeys.type,
    },
    {
      id: 3,
      key: FieldKeys.value,
    },
    {
      id: 4,
      key: FieldKeys.message,
    },
  ],
};

const CommonTableMetaData = {
  headers: [
    {
      id: 1,
      label: Headers.ruleName,
    },
    {
      id: 2,
      label: Headers.validationType,
    },
    {
      id: 3,
      label: Headers.value,
    },
    {
      id: 4,
      label: Headers.validationMessage,
    },
    {
      id: 5,
      label: Headers.action,
    },
  ],
  rows: [
    {
      id: 1,
      key: FieldKeys.name,
    },
    {
      id: 2,
      key: FieldKeys.type,
    },
    {
      id: 3,
      key: FieldKeys.value,
    },
    {
      id: 4,
      key: FieldKeys.message,
    },
  ],
};

const useTableColumnHelper = () => {
  const getTableMetaData = (fieldType: string) => {
    switch (fieldType) {
      case FieldType.String:
        return StringTypeTableMetaData;
      default:
        return CommonTableMetaData;
    }
  };

  return { getTableMetaData };
};

export default useTableColumnHelper;
