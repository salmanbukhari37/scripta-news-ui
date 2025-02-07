import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({
  children,
  handleSearch,
  searchTerm,
  toggleSidebar,
  sidebarOpen,
  authors,
  sources,
  handleSourceChange,
  handleAuthorChange,
  selectedSources,
  selectedAuthors,
  isCategory,
}: any) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => toggleSidebar()}
          ></div>
        )}
        <Sidebar
          authors={authors}
          sources={sources}
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          sidebarOpen={sidebarOpen}
          handleAuthorChange={handleAuthorChange}
          handleSourceChange={handleSourceChange}
          selectedSources={selectedSources}
          selectedAuthors={selectedAuthors}
        />

        <main className="flex-1 p-6">
          <Navbar
            toggleSidebar={toggleSidebar}
            handleSearch={handleSearch}
            searchTerm={searchTerm}
          />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
