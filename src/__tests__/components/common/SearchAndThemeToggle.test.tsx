import { render, screen, fireEvent } from "@testing-library/react";
import SearchAndThemeToggle from "../../../components/common/SearchAndThemeToggle";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { toggleDarkMode } from "../../../redux/reducers/themeSlice";

jest.mock("../../../redux/store", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe("SearchAndThemeToggle", () => {
  const mockHandleSearch = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useAppDispatch.mockReturnValue(mockDispatch);
  });

  it("renders the search input and dark mode switch", () => {
    useAppSelector.mockReturnValue({ theme: { darkMode: false } });

    render(
      <SearchAndThemeToggle
        handleSearch={mockHandleSearch}
        searchTerm=""
        classes="flex"
      />
    );

    expect(screen.getByPlaceholderText(/search news/i)).toBeInTheDocument();

    expect(screen.getByTestId("dark-mode-toggle")).toBeInTheDocument();
  });

  it("dispatches toggleDarkMode action when the dark mode switch is toggled", () => {
    useAppSelector.mockReturnValue({ theme: { darkMode: true } });

    render(
      <SearchAndThemeToggle
        handleSearch={mockHandleSearch}
        searchTerm=""
        classes="flex"
      />
    );

    const darkModeSwitch = screen.getByTestId("dark-mode-toggle");

    fireEvent.click(darkModeSwitch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleDarkMode());
  });
});
