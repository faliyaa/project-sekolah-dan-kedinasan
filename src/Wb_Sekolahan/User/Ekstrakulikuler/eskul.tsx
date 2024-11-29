import Sidebar from '../Sidebar/sidebar';
import Navbar from '../Navbar/navbar';
import ExtracurricularList from './DaftarEkstrakulikuler';

const Layout = () => {
  return (
    <div class="top">
      <Sidebar />
        <Navbar />
        <div class="listeskul">
          <ExtracurricularList />
        </div>
    
    </div>
  );
};

export default Layout;