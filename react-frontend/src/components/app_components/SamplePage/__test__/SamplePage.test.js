import React from "react";
import { render, screen } from "@testing-library/react";

import SamplePage from "../SamplePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders sample page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SamplePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("sample-datatable")).toBeInTheDocument();
    expect(screen.getByRole("sample-add-button")).toBeInTheDocument();
});
