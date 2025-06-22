import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem
} from '@mui/material';
import EmployeeService from '../../../service/EmployeeService'
import axios from 'axios';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
const AddEmployee = ({ open, onClose, getEmployees }) => {

  const initialFormState = {
    name: '',
    companyId: null,

  };

  const [employee, setEmployee] = useState(initialFormState);
  const [error, setError] = useState(false);
   const [companies, setCompanies] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5052/api/Company/GetAllCompany')
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error(err));
  }, []);
  const handleSubmit = () => {
    if (employee.name.trim() === ''|| employee.companyId===null) {
      setError(true);
      return;
    }
    try {
      EmployeeService.addEmployee(employee).then(() => {
        getEmployees();
      })

    } catch (err) {
      console.error('Gönderme hatası:', err);
    } finally {
      setEmployee(initialFormState);
      setError(false);
      onClose();
    }
  };
  const handleChangeName = (e) => {
    setEmployee((prev)=>({...prev, name: e.target.value }));
    if (e.target.value.trim() !== '') setError(false);
  };
  const handleChangeCompanyId = (e) => {
    setEmployee((prev)=>({...prev, companyId: e.target.value }));
    if (e.target.value !== null) setError(false);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-employee-modal"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          Yeni Personel Ekle
        </Typography>
        <TextField
          label="Personel Adı"
          fullWidth
          margin="normal"
          value={employee.name}
          onChange={(e) => handleChangeName(e)}
          error={error}
          helperText={error ? 'Personel adı boş bırakılamaz' : ''}
        />
        <Select
        labelId="company-select-label"
        id="company-select"
        value={employee.companyId}
        label="Şirket Seç"
        onChange={(e) => handleChangeCompanyId(e)}
      >
        {companies.map((company) => (
          <MenuItem key={company.id} value={company.id}>
            {company.name}
          </MenuItem>
        ))}
      </Select>
        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>İptal</Button>
          <Button variant="contained" onClick={handleSubmit}>Kaydet</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddEmployee;