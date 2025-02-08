import { useAppSelector } from "../../redux/store";
import LeftSidebar from "./LeftSidebar";

const Sidebar = ({
  handleSourceChange,
  handleAuthorChange,
  handleSearch,
  searchTerm,
}: any) => {
  const { sidebarOpen }: any = useAppSelector((state: any) => state.general);

  return (
    <div
      className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:block w-64 p-4 space-y-6 flex-shrink-0 bg-white text-gray-900 dark:bg-gray-800 dark:text-white transition-transform duration-300 fixed lg:static z-50 top-0 left-0 bottom-0 lg:top-0 overflow-y-auto`}
    >
      <LeftSidebar
        handleSourceChange={handleSourceChange}
        handleAuthorChange={handleAuthorChange}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Sidebar;
