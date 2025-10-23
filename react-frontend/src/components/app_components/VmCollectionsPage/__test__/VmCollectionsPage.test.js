import React from "react";
import { render, screen } from "@testing-library/react";

import VmCollectionsPage from "../VmCollectionsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders vmCollections page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <VmCollectionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("vmCollections-datatable")).toBeInTheDocument();
    expect(screen.getByRole("vmCollections-add-button")).toBeInTheDocument();
});
