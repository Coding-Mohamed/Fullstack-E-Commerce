// App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./AppContent"; // Import the new component
import store from "./store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;
