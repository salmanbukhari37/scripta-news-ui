import { render, screen, fireEvent } from "@testing-library/react";
import Layout from "components/layout/Layout";

jest.mock("components/sidebar/Sidebar", () => ({
  __esModule: true,
  default: jest.fn(({ handleSearch }) => {
    <div data-testid="sidebar">
      <input
        type="text"
        placeholder="Search news..."
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>;
  }),
}));

jest.mock("components/navbar/Navbar", () => ({
  __esModule: true,
  default: jest.fn(({ handleSearch }) => {
    handleSearch();
    return <div data-testid="navbar" />;
  }),
}));

jest.mock("components/sidebar/LeftSidebarToggler", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="sidebar-toggler" />),
}));

describe("Layout", () => {
  const mockHandleSearch = jest.fn();
  const mockHandleSourceChange = jest.fn();
  const mockHandleAuthorChange = jest.fn();
  const mockSearchTerm = "Test Search Term";

  it("renders the sidebar, navbar, and children correctly", () => {
    render(
      <Layout
        handleSearch={mockHandleSearch}
        searchTerm={mockSearchTerm}
        handleSourceChange={mockHandleSourceChange}
        handleAuthorChange={mockHandleAuthorChange}
      >
        <div data-testid="child-content">Child Content</div>
      </Layout>
    );

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });
});
