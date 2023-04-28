import React from "react";
import NotFound from "./views/misc/notFoundView.js";
import Building from "./views/misc/buildingView";
import Items from "./views/itemsDataView.js";
import { Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { columns } from "./models/article";
import store from "./store.js";


function App() {
  return (
    <Routes>
      <Route path="/articles" element={
        <Items
          columns={columns}
          title={'Articles'}
          singleTitle='article'
          categories={[]}
          data={() => { return store.getState().articles }}
        />}
      />
      <Route path="/" element={<Building />} />
      <Route path="/about" element={<Building />} />
      <Route path="/customers" element={<Building />} />
      <Route path="/orders" element={<Building />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
