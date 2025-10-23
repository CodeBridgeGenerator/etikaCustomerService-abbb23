import React from "react";
import { render, screen } from "@testing-library/react";

import EnquiriesCreateDialogComponent from "../EnquiriesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders enquiries create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EnquiriesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("enquiries-create-dialog-component")).toBeInTheDocument();
});
