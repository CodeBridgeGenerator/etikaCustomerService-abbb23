import React from "react";
import { render, screen } from "@testing-library/react";

import ReplacementsEditDialogComponent from "../ReplacementsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders replacements edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ReplacementsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("replacements-edit-dialog-component")).toBeInTheDocument();
});
