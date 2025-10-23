import React from "react";
import { render, screen } from "@testing-library/react";

import ReplacementsCreateDialogComponent from "../ReplacementsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders replacements create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ReplacementsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("replacements-create-dialog-component")).toBeInTheDocument();
});
