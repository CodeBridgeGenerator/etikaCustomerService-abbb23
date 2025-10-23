import React from "react";
import { render, screen } from "@testing-library/react";

import EnquiriesPage from "../EnquiriesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders enquiries page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EnquiriesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("enquiries-datatable")).toBeInTheDocument();
    expect(screen.getByRole("enquiries-add-button")).toBeInTheDocument();
});
