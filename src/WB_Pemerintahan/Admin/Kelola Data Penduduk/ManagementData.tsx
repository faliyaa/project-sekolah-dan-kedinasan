import { createSignal } from "solid-js";
import Sidebar from "../Sidebar/sidebaradmin"; // Adjust the path as necessary
import Navbar from "../Navbar/navbaradmin"; // Adjust the path as necessary
import Data from "./DataPenduduk"; // Adjust the path as necessary


const Dashboard = () => {
  const [] = createSignal(true);

  return (
    <div>
      <Sidebar/>
    <div class="dashboard-container">
      
      <div class="main-content">
     {<Data/>}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
