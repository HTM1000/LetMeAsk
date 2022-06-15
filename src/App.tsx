import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContext';
import { AdminRoom } from "./screens/AdminRoom";

import { Home } from "./screens/Home";
import { NewRoom } from "./screens/NewRoom";
import { Room } from "./screens/Room";

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />

          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
