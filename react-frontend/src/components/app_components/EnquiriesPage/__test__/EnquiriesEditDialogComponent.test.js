import React from "react";
import { render, screen } from "@testing-library/react";

import EnquiriesEditDialogComponent from "../EnquiriesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders enquiries edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EnquiriesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("enquiries-edit-dialog-component")).toBeInTheDocument();
});
