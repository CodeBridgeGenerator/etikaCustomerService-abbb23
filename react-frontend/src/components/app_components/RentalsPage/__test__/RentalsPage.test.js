import React from "react";
import { render, screen } from "@testing-library/react";

import RentalsPage from "../RentalsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders rentals page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RentalsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("rentals-datatable")).toBeInTheDocument();
    expect(screen.getByRole("rentals-add-button")).toBeInTheDocument();
});
