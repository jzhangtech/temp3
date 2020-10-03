import React from 'react';
import './App.css';
import TestData from './temp.json';
import ObjectDisplay from "./components/ObjectDisplay";

function App() {
    return (
        <div className=''>
            <ObjectDisplay obj={TestData}/>
        </div>
    );
}

export default App;
