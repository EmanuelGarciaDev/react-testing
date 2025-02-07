import { MemoryRouter } from "react-router-dom";
import { act, renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { server } from "../mocks/server";
import { Order } from "../types";
import { useSession, SessionProvider } from "../context/AuthContext";
import { useOrders } from "./useOrders";

vi.mock("../context/AuthContext", async () => {
  const actual = await vi.importActual("../context/AuthContext");
  return {
    ...actual,
    useSession: vi.fn(),
  };
});

describe("useOrdersMSW", () => {
  const mockUser = { id: 1, name: "elema" };
  beforeEach(() => {
    (useSession as Mock).mockReturnValue({ user: mockUser });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SessionProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </SessionProvider>
  );
  it("should fetch orders", async () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper,
    });
    const initialLoading = result.current.loading;
    expect(initialLoading).toBe(true);
    await act(async () => {});
    const lengthOrders = result.current.orders.length;
    expect(lengthOrders).toBe(1);
  });
  it("should get an error", async () => {
    server.use(
      http.get("http://localhost:3001/orders", () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "Internal Server Error",
        });
      })
    );
    const { result } = renderHook(() => useOrders(), { wrapper });
    await act(async () => {});
    const error = result.current.error;
    expect(error).toBe("Failed to fetch orders. Please try again later.");
  });
});
