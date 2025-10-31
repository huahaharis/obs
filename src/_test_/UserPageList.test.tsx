import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { UserListPage } from "../pages/userListPage";

jest.mock("../store/userStore", () => ({
  useUserStore: () => ({
    users: [],
    loading: false,
    actionLoading: false,
    fetchUsers: jest.fn(),
    addUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  }),
}));

describe("UserListPage", () => {

  it("renders correctly", () => {
    render(<UserListPage />);
    expect(screen.getByText("User Management")).toBeInTheDocument();
  });

    it("renders Add User button", () => {
    render(<UserListPage />);
    expect(screen.getByRole("button", { name: /add user/i })).toBeInTheDocument();
  });

  it("shows empty state when no users", () => {
    render(<UserListPage />);
    expect(screen.getByText("No users found")).toBeInTheDocument();
  });
});

