import "./App.css";

import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  
  return (
  <>
    <div className="flex flex-col min-h-screen">
        <Header/>
        {/* Main Content */}
        <main className="flex-grow bg-[#102742]">
            <Outlet />
        </main>
        {/* Footer */}
        <Footer />
    </div>
    </>)
}

export default App
