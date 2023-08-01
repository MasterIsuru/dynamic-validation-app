import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { FormValidationTable } from "../../components/FormValidationTable";

describe("Renders form validation table correctly", async () => {
  it("Should render validation rules header", async () => {
    render(
      <FormValidationTable
        setOpen={() => {}}
        fieldType={"number"}
        validations={[]}
        setCurrentTab={() => {}}
        setCurrentItem={() => {}}
        setValidations={() => {}}
      />
    );
    const h6 = await screen.queryAllByLabelText("Validation rules");
    expect(h6).not.toBeNull();
  });

  it("Should render table data with please enter a vowel!", async () => {
    render(
      <FormValidationTable
        setOpen={() => {}}
        fieldType={"string"}
        validations={[
          {
            id: 111,
            name: "vowelRegex",
            type: "custom",
            value: "/^[aeiou]$/",
            message: "Please enter a vowel!",
          },
        ]}
        setCurrentTab={() => {}}
        setCurrentItem={() => {}}
        setValidations={() => {}}
      />
    );
    const label = await screen.queryAllByLabelText("Please enter a vowel!");
    expect(label).not.toBeNull();
  });
});
