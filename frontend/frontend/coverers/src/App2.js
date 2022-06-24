import React, { useEffect, useState } from 'react';
import TopCovers from './components/TopCovers';
import TopCoversLoadingComponent from './components/TopCoversLoading';
import Header from './components/Header';



function App2() {
    const TopCoversLoading = TopCoversLoadingComponent(TopCovers);
    const [appState, setAppState] = useState({
        loading: false,
        covers: null,
    });

    const authHeaders = new Headers({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token')
            ? 'JWT ' + localStorage.getItem('access_token')
            : null
    });

    useEffect(() => {
        setAppState({ loading: true });
        const apiUrl = `http://localhost:8000/api/topcovers/fd/`;
        fetch(apiUrl, { method: 'GET', headers: authHeaders })
            .then((data) => data.json())
            .then((covers) => {
                setAppState({ loading: false, covers: covers });
            });
    }, [setAppState]);
    return (
        <div className='App'>
            <Header />
            <center>
                <u><h1>Top Covers</h1></u>
                <br /><br />
                <TopCoversLoading isLoading={appState.loading} covers={appState.covers} />

            </center>
        </div>
    );

}

export default App2
