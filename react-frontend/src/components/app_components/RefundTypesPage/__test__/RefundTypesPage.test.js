import React from "react";
import { render, screen } from "@testing-library/react";

import RefundTypesPage from "../RefundTypesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders refundTypes page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RefundTypesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("refundTypes-datatable")).toBeInTheDocument();
    expect(screen.getByRole("refundTypes-add-button")).toBeInTheDocument();
});
