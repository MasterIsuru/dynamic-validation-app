import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { CheckboxField } from "./../../../components/fields/CheckboxField";

describe("Renders checkbox field correctly", async () => {
  it("Should render checkbox label", async () => {
    render(
      <CheckboxField label="Checkbox Label" value="1" onChange={() => {}} />
    );
    const label = await screen.queryAllByLabelText("Checkbox Label");
    expect(label).not.toBeNull();
  });
});
