// import React, { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import { bpmEngine as fakeBpmEngine } from "./external-dummy/bpmEngine";

import SQLDashboard from './App';
import './index.css';

console.log("SQLDashboard", SQLDashboard, fakeBpmEngine);

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <SQLDashboard bpmEngine={fakeBpmEngine} url={'fake_url'} />
//   </StrictMode>,
// )


// createRoot(document.getElementById('root')!).render(
//   React.createElement(SQLDashboard, { bpmEngine: fakeBpmEngine, url: 'fake_url' })
// )

// react_sqlDashboard.createRoot(document.getElementById('root')).render(
//   react_sqlDashboard.React.createElement(react_sqlDashboard.SQLDashboard, { bpmEngine: react_sqlDashboard.fakeBpmEngine, url: 'fake_url' })
// )