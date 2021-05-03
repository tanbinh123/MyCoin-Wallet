import React from 'react';
import Blockchain from './components/Blockchain'

class App extends React.Component {

  render() {
      return (
          <div className="ui container" style={{ marginTop: '10px' }}>
            <Blockchain />
          </div>
      );
  }
}

export default App;