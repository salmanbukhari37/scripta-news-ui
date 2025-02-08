import LeftSidebarToggler from "components/sidebar/LeftSidebarToggler";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({
  children,
  handleSearch,
  searchTerm,
  handleSourceChange,
  handleAuthorChange,
}: any) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex">
        <LeftSidebarToggler />
        <Sidebar
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          handleAuthorChange={handleAuthorChange}
          handleSourceChange={handleSourceChange}
        />

        <main className="flex-1 p-6">
          <Navbar handleSearch={handleSearch} searchTerm={searchTerm} />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
