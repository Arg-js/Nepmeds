import Provider from "./providers";
import AppRoutes from "./routes/AppRoutes";
import "react-calendar/dist/Calendar.css";
import "./assets/styles/reactCalender.css";

const App = () => {
  return (
    <Provider>
      <AppRoutes />
    </Provider>
  );
};

export default App;
