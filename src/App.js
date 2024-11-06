import React from 'react';
import AppRoutes from './AppRoutes';
import Navbar from './components/Navbar';

function App() {
    return (
        <div className="App">
            <Navbar />
            <AppRoutes />
        </div>
    );
}

export default App;
