import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';
import CompanyService from '../../../service/CompanyService'

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

const AddCompany = ({ open, onClose, getCompanies }) => {

  const initialFormState = {
    name: ''
  };

  const [company, setCompany] = useState(initialFormState);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (company.name.trim() === '') {
      setError(true);
      return;
    }

    try {
      CompanyService.addCompany(company).then(() => {
        getCompanies();
      })

    } catch (err) {
      console.error('Gönderme hatası:', err);
    } finally {
      setCompany(initialFormState);
      setError(false);
      onClose();
    }

  };

  const handleChange = (e) => {
    setCompany({ name: e.target.value });
    if (e.target.value.trim() !== '') setError(false);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-company-modal"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          Yeni Şirket Ekle
        </Typography>
        <TextField
          label="Şirket Adı"
          fullWidth
          margin="normal"
          value={company.name}
          onChange={(e) => handleChange(e)}
          error={error}
          helperText={error ? 'Şirket adı boş bırakılamaz' : ''}
        />
        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>İptal</Button>
          <Button variant="contained" onClick={handleSubmit}>Kaydet</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCompany;
