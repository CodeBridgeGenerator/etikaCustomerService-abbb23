import React from "react";
import { render, screen } from "@testing-library/react";

import AgreementsPage from "../AgreementsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders agreements page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AgreementsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("agreements-datatable")).toBeInTheDocument();
    expect(screen.getByRole("agreements-add-button")).toBeInTheDocument();
});
