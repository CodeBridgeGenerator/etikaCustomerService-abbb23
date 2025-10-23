import React from "react";
import { render, screen } from "@testing-library/react";

import BankDetailsPage from "../BankDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders bankDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <BankDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("bankDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("bankDetails-add-button")).toBeInTheDocument();
});
