import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { FormValidationAddForm } from "../../components/FormValidationAddForm";

describe("Renders form validation add form correctly", async () => {
  it("Should render add validation rule header", async () => {
    render(
      <FormValidationAddForm
        fieldType={"number"}
        currentItem={null}
        validations={[]}
        setCurrentTab={() => {}}
        setValidations={() => {}}
      />
    );
    const h6 = await screen.queryAllByLabelText("Add validation rule");
    expect(h6).not.toBeNull();
  });

  it("Should render table data with value should be greater than 5!", async () => {
    render(
      <FormValidationAddForm
        fieldType={"number"}
        currentItem={{
          id: 111,
          name: "greaterThan5",
          type: ">",
          value: "5",
          message: "Value should be greater than 5!",
        }}
        validations={[
          {
            id: 111,
            name: "greaterThan5",
            type: ">",
            value: "5",
            message: "Value should be greater than 5!",
          },
        ]}
        setCurrentTab={() => {}}
        setValidations={() => {}}
      />
    );
    const label = await screen.queryAllByLabelText("Value should be greater than 5!");
    expect(label).not.toBeNull();
  });

  it("Should render table data with value should be greater than 10/10/2000!", async () => {
    render(
      <FormValidationAddForm
        fieldType={"date"}
        currentItem={{
          id: 111,
          name: "greaterThan 10/10/2000",
          type: ">",
          value: "10/10/2000",
          message: "Value should be greater than 10/10/2000!",
        }}
        validations={[
          {
            id: 111,
            name: "greaterThan 10/10/2000",
            type: ">",
            value: "10/10/2000",
            message: "Value should be greater than 10/10/2000!",
          },
        ]}
        setCurrentTab={() => {}}
        setValidations={() => {}}
      />
    );
    const label = await screen.queryAllByLabelText("Value should be greater than 10/10/2000!");
    expect(label).not.toBeNull();
  });
});
