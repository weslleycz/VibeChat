import { setupIonicReact } from "@ionic/react";
import { AppRouters } from "./Routes";
import "./globals.scss"

setupIonicReact();

const App: React.FC = () => <AppRouters />;

export default App;
