import FAQAdmin from "./FAQAdmin";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import React  from "react";



const App = () => (
  <FAQAdmin
    fetchUrl="http://localhost:3500/items"
    deleteUrl="http://localhost:3500/items"
    AddModal={AddModal}
    EditModal={EditModal}
  />
);

export default App;
