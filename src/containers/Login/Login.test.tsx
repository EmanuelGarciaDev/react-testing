import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getAuth } from "../../services/getAuth";
import { SessionProvider } from "../../context/AuthContext";
import { Login } from "./Login";

vi.mock("react-router-dom", async () => {
    const actual = await import("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

vi.mock("../../services/getAuth", () => ({
  getAuth: vi.fn(),
}));

const mockGetAuth = getAuth as Mock;
const mockNavigate = vi.fn();

describe("<Login />", () => {
    let usernameInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let buttonLogin: HTMLButtonElement;
    let showPassword: HTMLButtonElement;
    
  beforeEach(() => {
    render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    );
    usernameInput = screen.getByPlaceholderText("Username");
    passwordInput = screen.getByPlaceholderText("Password");
    buttonLogin = screen.getByRole("button", { name: "Login" });
  });

it("should show error message", async () => {
  mockGetAuth.mockRejectedValue(new Error("Invalid credentials"));
  await act(() => {
    fireEvent.change(usernameInput, { target: { value: "wrongUser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
    fireEvent.click(buttonLogin);
  });
  const errorMessage = screen.getByText("Invalid credentials");
  expect(errorMessage).toBeInTheDocument();
});

it("should navigate to /orders", async () => {
  mockGetAuth.mockResolvedValue({ success: true });
await act(() => {
    fireEvent.change(usernameInput, { target: { value: "rightUser" } });
    fireEvent.change(passwordInput, { target: { value: "rightPassword" } });
    fireEvent.click(buttonLogin);
  });
  await waitFor(() => {
      expect(mockGetAuth).toHaveBeenCalledWith("rightUser", "rightPassword");
      expect(mockNavigate).toHaveBeenCalledWith("/orders");
  })
});

it("should show password", async () => {
    //arrange
    showPassword = screen.getByRole("button", {name: "show"})
    //act
    await act(() => {
        fireEvent.change(passwordInput, {target: {value: "testPassword"}});
        fireEvent.click(showPassword);
    })
    //assert
    expect(showPassword).toHaveTextContent("hide");
    expect(passwordInput).toHaveAttribute("type", "text");
})
it("should hide password", async () => {
    showPassword = screen.getByRole("button", {name: "show"})
    await act(() => {
        fireEvent.change(passwordInput, {target: {value: "testPassword"}});
        fireEvent.click(showPassword);
        fireEvent.click(showPassword);
    })
    expect(showPassword).toHaveTextContent("show");
    expect(passwordInput).toHaveAttribute("type", "password");
})
});
