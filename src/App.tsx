import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Upload from './pages/Upload';
import Layout from './components/Layout';
import Iridescence from './src/blocks/Backgrounds/Iridescence/Iridescence';


const App = () => {

  return (
    <div className="relative font-roboto text-white uppercase">
      <Iridescence
        color={[0.2, 0.5, 1]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
      />
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} />
      <Route path="/upload" element={<Layout><Upload /></Layout>} />
      <Route path="*" element={<Layout><h1>404 Not Found</h1></Layout>} />
    </Routes>
    </div>
  );
};

export default App;