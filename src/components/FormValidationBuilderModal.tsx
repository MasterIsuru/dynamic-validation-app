import { useState } from "react";
import { ValidationRule } from "../store/form.ts";
import { Modal } from "@mui/material";
import { FormValidationTable } from "./FormValidationTable.tsx";
import { FormValidationAddForm } from "./FormValidationAddForm.tsx";

type ModalProps = {
  open: boolean;
  fieldType: string;
  validations: ValidationRule[];
  setOpen: (value: boolean) => void;
  setValidations: (value: ValidationRule[]) => void;
};

export const FormValidationBuilderModal = ({
  open,
  setOpen,
  fieldType,
  validations,
  setValidations,
}: ModalProps) => {
  const [currentTab, setCurrentTab] = useState<string>("list");
  const [currentItem, setCurrentItem] = useState<ValidationRule | null>(null);

  const renderContent = () => {
    if (currentTab === "list") {
      return (
        <FormValidationTable
          setOpen={setOpen}
          fieldType={fieldType}
          validations={validations}
          setCurrentTab={setCurrentTab}
          setCurrentItem={setCurrentItem}
          setValidations={setValidations}
        />
      );
    }
    return (
      <FormValidationAddForm
        fieldType={fieldType}
        currentItem={currentItem}
        validations={validations}
        setCurrentTab={setCurrentTab}
        setValidations={setValidations}
      />
    );
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>{renderContent()}</>
    </Modal>
  );
};
