import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import ProgressReport from './components/ProgressReport';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={TaskList} />
          <Route path="/task/:id" component={TaskDetail} />
          <Route path="/progress" component={ProgressReport} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;