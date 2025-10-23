import React from "react";
import { render, screen } from "@testing-library/react";

import ComplaintTypesPage from "../ComplaintTypesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders complaintTypes page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ComplaintTypesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("complaintTypes-datatable")).toBeInTheDocument();
    expect(screen.getByRole("complaintTypes-add-button")).toBeInTheDocument();
});
