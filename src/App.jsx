// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Catagories from './components/Catagories';

function App() {
  return (
    <div className="">
      <Nav />
      <div className="flex-1 flex-col">
        <div className="flex">
          <Sidebar />
          <div className="p-4 flex-1 overflow-y-auto">
            <Routes>
              <Route
                path="/categories"
                element={
                  <DndProvider backend={HTML5Backend}>
                    <Catagories />
                  </DndProvider>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
