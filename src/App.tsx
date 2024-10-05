import "./index.css";
import { FC } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store,persistor } from "./redux/store";
// Pages
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Home from "./pages/Home";
import CreateBlog from "./pages/Createblog";
import 'react-confirm-alert/src/react-confirm-alert.css';

const App: FC = () => {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<CreateBlog />} />
        </Routes>
      </Router>
      </PersistGate>
      </Provider>
    </>
  );
};

export default App;
