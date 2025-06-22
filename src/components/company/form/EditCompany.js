import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material';
import CompanyService from "../../../service/CompanyService";

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


const EditCompany = ({ open, onClose, updateCompany, getCompanies }) => {
  const [company, setCompany] = useState({ id: '', name: '' });
  const [error, setError] = useState(false);

  useEffect(() => {
    if (updateCompany) {
      setCompany({ id: updateCompany.id, name: updateCompany.name });
      setError(false);
    }
  }, [updateCompany]);

  const handleChange = (e) => {
    setCompany((prev) => ({ ...prev, name: e.target.value }));
    if (e.target.value.trim() !== '') setError(false);
  };

  const handleSubmit = () => {
    
    if (company.name.trim() === '') {
      setError(true);
      return;
    }

    try {
      CompanyService.updateCompany(company).then(() => {
        getCompanies();
      })

    } catch (err) {
      console.error('Gönderme hatası:', err);
    } finally {
      onClose();
    }
  };

  if (!company) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Şirketi Düzenle
        </Typography>
        <TextField
          fullWidth
          label="Şirket Adı"
          value={company.name}
          onChange={handleChange}
          margin="normal"
          error={error}
          helperText={error ? 'Şirket adı boş bırakılamaz' : ''}
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

export default EditCompany;
