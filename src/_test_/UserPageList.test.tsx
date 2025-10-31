import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserListPage } from "../pages/userListPage";
import { jest } from "@jest/globals";
import { fetchDefaultUsers } from "../utils/api";

// ✅ Mock Zustand store
const mockFetchUsers = jest.fn();
const mockAddUser = jest.fn();
const mockUpdateUser = jest.fn();
const mockDeleteUser = jest.fn();

jest.mock("../store/userStore", () => ({
  useUserStore: () => ({
    users: [
      { id: 1, name: "John Doe", email: "john@example.com", phone: "123456", image: "test.png" },
    ],
    loading: false,
    actionLoading: false,
    fetchUsers: mockFetchUsers,
    addUser: mockAddUser,
    updateUser: mockUpdateUser,
    deleteUser: mockDeleteUser,
  }),
}));

// ✅ Fix TypeScript type for global.fetch mock
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { id: 1, name: "John Doe", email: "john@example.com", phone: "123456" },
      ]),
  }) as unknown as Response
) as unknown as typeof fetch;

describe("UserListPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the page title", async () => {
    render(<UserListPage />);
    expect(await screen.findByText(/User Management/i)).toBeInTheDocument();
  });

  it("renders the Add User button", () => {
    render(<UserListPage />);
    const addButton = screen.getByRole("button", { name: /add user/i });
    expect(addButton).toBeInTheDocument();
  });

  it("renders an existing user card", async () => {
    render(<UserListPage />);
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("calls fetchUsers on mount", async () => {
    render(<UserListPage />);
    await waitFor(() => expect(mockFetchUsers).toHaveBeenCalledTimes(1));
  });

  it("opens modal when Add User button is clicked", async () => {
    render(<UserListPage />);
    const addButton = screen.getByTestId("add-user-btn");
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    });
  });

  it("calls updateUser when editing", async () => {
    render(<UserListPage />);
    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    const saveButton = await screen.findByText(/save changes/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalled();
    });
  });

  it("calls deleteUser when delete button is clicked", async () => {
    render(<UserListPage />);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalled();
    });
  });
});
