import { toggleSidebar } from "../../redux/reducers/generalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const LeftSidebarToggler = () => {
  const dispatch = useAppDispatch();
  const { sidebarOpen }: any = useAppSelector((state: any) => state.general);

  const toggleSidebarDispatcher = () => {
    dispatch(toggleSidebar());
  };
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebarDispatcher}
        ></div>
      )}
    </>
  );
};

export default LeftSidebarToggler;
