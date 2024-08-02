import { RouterProvider } from "react-router-dom";
import { ColorModeProvider } from "./theme";
import router from "./routes";

function App() {
  return (
    <ColorModeProvider>
      <RouterProvider router={router} />
    </ColorModeProvider>
  );
}

export default App;
