import React from "react";
import { render, screen } from "@testing-library/react";

import ComplaintTypesEditDialogComponent from "../ComplaintTypesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders complaintTypes edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ComplaintTypesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("complaintTypes-edit-dialog-component")).toBeInTheDocument();
});
