import React, { useState } from 'react';
import CompanyService from "../../../service/CompanyService";

const AddCompany = (props) => {
  const initialFormState = {

    name: ''

  };
  const [company, setCompany] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCompany({ ...company, [name]: value });
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!company.name) return;
          try {
            const result = CompanyService.addCompany(company)
              .then(() => props.addCompany())

          } catch (err) {
            console.error('Gönderme hatası:', err);
          }
          setCompany(initialFormState);
        }}
        className="needs-validation"
      >
        <label htmlFor="Name">Name:</label>
        <input
          type="text"
          name="name"
          value={company.name}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Name"
          required
        />
        {/* <label htmlFor="Email">Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Email"
          required
        /> */}
        {/* <label htmlFor="Contact">Contact:</label>
        <input
          type="number"
          name="contact"
          value={user.contact}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Contact"
          required
        /> */}
        {/* <br />
        <label htmlFor="Email">Status:</label>
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              name="status"
              value="Active"
              onChange={handleInputChange}
              checked
            />
            Active
          </label>
        </div> 
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              name="status"
              value="Inactive"
              onChange={handleInputChange}
            />
            Inactive
          </label>
        </div>*/}
        <br />
        <br />
        <button className="btn btn-primary">Add new company</button>
      </form>
    </div>
  );
};

export default AddCompany;
