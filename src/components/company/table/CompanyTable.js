import React from "react";

const CompanyTable = props => (  
    <table className="table table-striped ">
      <thead>
        <tr>
          <th>Id</th>
          <th>İsim</th>
   
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.companies.length > 0 ? (
          props.companies.map(company => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.activity}</td>
    
              <td>
                <button
                  onClick={() => {
                    props.editRow(company);
                  }}
                  className="button btn btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => props.deleteCompany(company.id)}
                  className="button btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No company</td>
          </tr>
        )}
      </tbody>
    </table>  
);

export default CompanyTable;