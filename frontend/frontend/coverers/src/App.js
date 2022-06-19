import React, { useEffect, useState } from 'react';
import Covers from './components/Covers';
import CoversLoadingComponent from './components/CoversLoading';
import Header from './components/Header';



function App() {
    const CoversLoading = CoversLoadingComponent(Covers);
    const [appState, setAppState] = useState({
        loading : false,
        covers : null,
    });

    const authHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token')
        ? 'JWT ' + localStorage.getItem('access_token')
        : null
    });

    useEffect(() => {
      setAppState({ loading : true });
      const apiUrl = `http://localhost:8000/api/`;
      fetch(apiUrl, {method: 'GET', headers: authHeaders})
          .then((data) => data.json())
          .then((covers) => {
              setAppState({ loading : false, covers : covers});
          });
    }, [setAppState]);
    return (
        <div className='App'>
            <Header/>
            <center>
            <u><h1>Latest Covers</h1></u>
            <br /><br />
            <CoversLoading isLoading = { appState.loading } covers = { appState.covers } />
            </center>
        </div>
    );

}

export default App
