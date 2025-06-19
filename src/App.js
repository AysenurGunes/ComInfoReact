import React, { useState, Fragment, useEffect } from "react";
import AddCompany from "./forms/AddCompany";
import EditCompany from "./forms/EditCompany";
import CompanyTable from "./table/CompanyTable";
import CompanyService from "./service/CompanyService";


const App = () => {
  // Data
  const initialFormState = {
    id: null,
    name: ''
  };

  


  //const initialFormState = { id: null, name: "", email: "", contact: "",status:"" };

  // Setting state
  const [companies, setCompanies] = useState([]);
  const [currentCompany, setCurrentCompany] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

useEffect(() => {
    getCompanies()
  }, []);

   const getCompanies = () => {
  CompanyService.getCompanies()
    .then(data => setCompanies(data))
      .catch(error => console.log('Hata:', error));
   
  };
  // CRUD operations
  const addCompany = () => {
 
   getCompanies()
  };

  const deleteCompany = id => {
   CompanyService.deleteCompany(id)
   .then(()=>getCompanies());
   
  };

  const updateCompany = () => {
    setEditing(false);
    getCompanies()
  };

  const editRow = company => {
    setEditing(true);
    setCurrentCompany(company);
  };

  return (
    <div className="container">
      <h1>Manage Company</h1>
      <div className="flex-large">
          <h2>View Companies</h2>
          <CompanyTable companies={companies} editRow={editRow} deleteCompany={deleteCompany} />
        </div>
        <br/>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <h2>Edit Company</h2>
              <EditCompany
                editing={editing}
                setEditing={setEditing}
                currentCompany={currentCompany}
                updateCompany={updateCompany}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add Company</h2>
              <AddCompany addCompany={addCompany} />
            </Fragment>
          )}
        </div>
        <br />
        
      </div>
    </div>
  );
};

export default App;
