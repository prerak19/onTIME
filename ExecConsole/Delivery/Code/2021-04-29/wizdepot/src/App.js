import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header.js';
import Banner from './components/Banner.js';
import RegisterForm from './components/RegisterForm.js';
import Footer from './components/Footer.js';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <Container>
          <div className="bannerwrapper home">
            <Banner />
            <RegisterForm />
          </div>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default App;
