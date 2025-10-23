import React from "react";
import { render, screen } from "@testing-library/react";

import RefundTypesCreateDialogComponent from "../RefundTypesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders refundTypes create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RefundTypesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("refundTypes-create-dialog-component")).toBeInTheDocument();
});
