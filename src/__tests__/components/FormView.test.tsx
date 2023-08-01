import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render, screen } from "@testing-library/react";

import { FormView } from "../../components/FormView";

describe("Renders form view correctly", async () => {
  const initialState = {
    form: {
      fields: {
        stringKey: {
          key: "stringKey",
          type: "string",
          label: "String Label",
          rules: [
            {
              id: 111,
              name: "vowelRegex",
              type: "custom",
              value: "/^[aeiou]$/",
              message: "Please enter a vowel!",
            },
          ],
          value: "rr",
          isRequired: "",
        },
        numberKey: {
          key: "numberKey",
          type: "number",
          label: "Number Label",
          rules: [],
          value: "",
          isRequired: "1",
        },
        dateKey: {
          key: "dateKey",
          type: "date",
          label: "Date Label",
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
        <FormView />
      </Provider>
    );
    const h1 = await screen.queryByText("Form Preview");
    expect(h1).not.toBeNull();
  });

  it("Should render field with string label", async () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <FormView />
      </Provider>
    );
    const label = await screen.queryAllByLabelText("String Label");
    expect(label).not.toBeNull();
  });

  it("Should render field with number label", async () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <FormView />
      </Provider>
    );
    const label = await screen.queryAllByLabelText("Number Label");
    expect(label).not.toBeNull();
  });

  it("Should render field with date label", async () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <FormView />
      </Provider>
    );
    const label = await screen.queryAllByLabelText("Date Label");
    expect(label).not.toBeNull();
  });

  it("Should render Number Label is required validation message", async () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <FormView />
      </Provider>
    );
    const label = await screen.queryAllByLabelText("Number Label is required");
    expect(label).not.toBeNull();
  });

  it("Should render String Label is required validation message", async () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <FormView />
      </Provider>
    );
    const label = await screen.queryAllByLabelText("Please enter a vowel!");
    expect(label).not.toBeNull();
  });
});
