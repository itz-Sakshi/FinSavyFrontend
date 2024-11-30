import { Outlet } from "react-router-dom";

const PlayGameLayout = () => {
  return (
    <div>
      <Outlet /> {/* This renders child routes */}
    </div>
  );
};

export default PlayGameLayout;