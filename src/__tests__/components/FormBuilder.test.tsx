import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render, screen } from "@testing-library/react";

import { FormBuilder } from "../../components/FormBuilder";

describe("Renders form builder correctly", async () => {
  const initialState = {
    form: {
      fields: {
        stringKey: {
          key: "stringKey",
          type: "string",
          label: "String Label",
          rules: [],
          value: "",
          isRequired: "",
        },
      },
    },
  };
  const mockStore = configureStore();
  let store;

  it("Should render header", async () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <FormBuilder />
      </Provider>
    );
    const h1 = await screen.queryByText("Form Builder");
    expect(h1).not.toBeNull();
  });

  it("Should render field type dropdown", async () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <FormBuilder />
      </Provider>
    );
    const dropdown = await screen.queryAllByLabelText("Choose a field type");
    expect(dropdown).not.toBeNull();
  });

  it("Should render add field button", async () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <FormBuilder />
      </Provider>
    );
    const button = await screen.queryAllByLabelText("Add Field");
    expect(button).not.toBeNull();
  });

  it("Should render is required checkbox", async () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <FormBuilder />
      </Provider>
    );
    const label = await screen.queryAllByLabelText("Is Required");
    expect(label).not.toBeNull();
  });
});
