import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material';
import EmployeeService from '../../../service/EmployeeService';

const modalStyle = {
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

const EditEmployee = ({ open, onClose, updateEmployee, getEmployees }) => {
  const [employee, setEmployee] = useState({ id: '', name: '' });
  const [error, setError] = useState(false);

  useEffect(() => {
    if (updateEmployee) {
      setEmployee({ id: updateEmployee.id, name: updateEmployee.name });
      setError(false);
    }
  }, [updateEmployee]);

  const handleChange = (e) => {
    setEmployee((prev) => ({ ...prev, name: e.target.value }));
    if (e.target.value.trim() !== '') setError(false);
  };

  const handleSubmit = () => {
    
    if (employee.name.trim() === '') {
      setError(true);
      return;
    }

    try {
      EmployeeService.updateEmployee(employee).then(() => {
        getEmployees();
      })

    } catch (err) {
      console.error('Gönderme hatası:', err);
    } finally {
      onClose();
    }
  };

  if (!employee) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Personel Düzenle
        </Typography>
        <TextField
          fullWidth
          label="Personel Adı"
          value={employee.name}
          onChange={handleChange}
          margin="normal"
          error={error}
          helperText={error ? 'personel adı boş bırakılamaz' : ''}
        />
        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>İptal</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Kaydet
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditEmployee;