import { setupIonicReact } from "@ionic/react";
import { AppRouters } from "./Routes";

setupIonicReact();

const App: React.FC = () => <AppRouters />;

export default App;
