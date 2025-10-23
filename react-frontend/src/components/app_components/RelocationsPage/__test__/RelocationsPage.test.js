import React from "react";
import { render, screen } from "@testing-library/react";

import RelocationsPage from "../RelocationsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders relocations page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RelocationsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("relocations-datatable")).toBeInTheDocument();
    expect(screen.getByRole("relocations-add-button")).toBeInTheDocument();
});
