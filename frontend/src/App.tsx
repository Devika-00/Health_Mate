import React from 'react';
import './App.css';
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./routes/router";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/Store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";




const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
      <GoogleOAuthProvider  clientId="764597577602-g1p7m7jb940jl7bk02vtgso2prpe9m46.apps.googleusercontent.com">
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
    <Toaster />
    </GoogleOAuthProvider>
    </PersistGate>
      </Provider>
    </>
  );
}

export default App;
