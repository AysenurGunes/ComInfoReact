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
const AddEmployee = ({ open, onClose, getEmployee }) => {};

export default AddEmployee;