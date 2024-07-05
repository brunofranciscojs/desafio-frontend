import "./App.css"
import { Provider } from "react-redux"
import { store } from "./redux/storeCounter.tsx";
import Rotas from "./routes";

export default function App() {
  return ( 
    <Provider store={store}>
      <Rotas />
    </Provider>
  );
}