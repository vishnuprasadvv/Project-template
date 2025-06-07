import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MyRoutes from "./routes/myRoutes";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
