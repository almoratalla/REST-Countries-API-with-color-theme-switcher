import { Route, Switch  } from 'react-router-dom';
import Header from "./components/Header/Header";
import Home from "./containers/Home/Home";
import Details from "./containers/Details/Details";

function App() {

  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/home" component={Home} exact/>
        <Route path="/countries" component={Home} exact/>
        <Route path="/details/:country" component={Details}/>
      </Switch>
    </div>
  );
}

export default App;
