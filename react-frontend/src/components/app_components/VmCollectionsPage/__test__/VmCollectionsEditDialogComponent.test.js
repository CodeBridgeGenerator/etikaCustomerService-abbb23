import React from "react";
import { render, screen } from "@testing-library/react";

import VmCollectionsEditDialogComponent from "../VmCollectionsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders vmCollections edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <VmCollectionsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("vmCollections-edit-dialog-component")).toBeInTheDocument();
});
