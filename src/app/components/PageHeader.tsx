import { Avatar } from "antd";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

function PageHeader() {

  const auth = useContext(AuthContext);
  const { authState } = auth;

  return (
    <div className="bg-primary p-4 flex justify-between items-center text-white font-semibold drop-shadow-md">
      <div className="text-2xl font-bold lg:px-4">
        <span className="">Trakker</span>
      </div>
      <div className="uppercase ">
        <nav>
          <a href="/home" className="mx-2 px-2 py-2">
            <span>Dashboard</span>
          </a>
          <a href="/archives" className="mx-2 px-2 py-2">
            <span>Archive Documents</span>
          </a>
          <a href="/request" className="mx-2 px-2 py-2">
            <span>Archive Request</span>
          </a>
          <a href="/request-management" className="mx-2 px-2 py-2" >
            <span>Request Management</span>
          </a>
        </nav>
      </div>
      <div className="lg:px-4">
        <Avatar style={{ verticalAlign: 'middle' }} size="large" className="bg-accent text-black uppercase cursor-pointer">
          {authState?.user?.firstName?.substring(0, 1)}{authState?.user?.lastName?.substring(0, 1)}
        </Avatar>
      </div>
    </div>
  );
}

export default PageHeader;
