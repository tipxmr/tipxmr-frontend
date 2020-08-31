import { BrowserRouter, Link } from "react-router-dom";
import Routes from "./Routes";
import { Header, Footer } from "./components";
import monerojs from "./libs/monero";

function App() {
  console.log("App gestartet");
  return (
    <BrowserRouter>
      <main className="container">
        <Header />
        <Routes />
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
