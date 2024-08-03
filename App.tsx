import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Task List</Link>
        </li>
        <li>
          <Link to="/progress">Progress Report</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
```

```tsx
import React from 'react';

const NotFound: React.FC = () => {
  return <div>Sorry, the page you are looking for does not exist.</div>;
};

export default NotFound;
```

```tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import ProgressReport from './components/ProgressReport';
import NavBar from './components/NavBar'; // import NavBar component
import NotFound from './components/NotFound'; // import NotFound component

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <NavBar /> {/* Include the NavBar at the top */}
        <Switch>
          <Route exact path="/" component={TaskList} />
          <Route path="/task/:id" component={TaskDetail} />
          <Route path="/progress" component={ProgressReport} />
          <Route component={NotFound} /> {/* Handle undefined routes */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;