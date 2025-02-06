import { describe, it, expect, vi, Mock } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { getOrders } from "../services/getOrders";
import { useSession } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useOrders } from './useOrders'

vi.mock("../services/getOrders", () => ({
  getOrders: vi.fn(),
}));

vi.mock("../context/AuthContext", () => ({
  useSession: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("useOrders", () => {
  const mockGetOrders = getOrders as Mock;
  const mockUseSession = useSession as Mock;
  const mockUseNavigate = vi.fn();
  it("should return orders", async () => {
    const mockOrders = [
      {
        id: "c68d9cb9-8e9a-4f24-9d06-2901f698a8b8",
        customer: {
          id: "9a9f2b3f-7deb-48c3-b9f2-7e38b9d54d6a",
          name: "Carol Martinez",
          email: "carol.martinez@example.com",
        },
        products: [
          {
            id: "9d1a0f9a-5b7e-4b6a-8f0a-68f0b42d7373",
            name: "Fitness Tracker",
            price: 89.99,
            quantity: 1,
          },
          {
            id: "4d4c5c3b-7bec-4d8f-8d3f-3cbeb3986642",
            name: "Yoga Mat",
            price: 29.99,
            quantity: 1,
          },
          {
            id: "3c0234d8-d7b3-48a1-97a2-e31bf45db8a6",
            name: "Water Bottle",
            price: 14.99,
            quantity: 1,
          },
        ],
        total: 134.97,
        status: "processing",
        orderDate: "2023-10-20T11:30:00Z",
        shippingAddress: {
          street: "222 Maple Ave",
          city: "Smallville",
          state: "OH",
          zipCode: "87654",
          country: "USA",
        },
        paymentMethod: "credit_card",
      },
    ];
    mockGetOrders.mockResolvedValue(mockOrders);
    mockUseSession.mockReturnValue({ user: { id: 1 } });
    const { result } = renderHook(() => useOrders());
    expect(result.current.loading).toBe(true);
    await act(async () => {
        mockGetOrders.mockResolvedValue(mockOrders);
    });
    expect(result.current.orders).toEqual(mockOrders);
    expect(result.current.loading).toBe(false);
});
});
