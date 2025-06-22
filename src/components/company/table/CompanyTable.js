import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import AddCompany from "../form/AddCompany";
import CompanyService from "../../../service/CompanyService";
import EditCompany from "../form/EditCompany";


const CompanyTable = () => {

  const [companies, setCompanies] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    getCompanies()
  }, []);

  const getCompanies = () => {
    CompanyService.getCompanies()
      .then(data => setCompanies(data))
      .catch(error => console.log('Hata:', error));

  };

  const editRow = (company) => {
    setSelectedCompany(company);
    setEditOpen(true);
  };

  const deleteCompany = (id) => {
    CompanyService.deleteCompany(id)
      .then(() => getCompanies())
      .catch(error => console.log('Hata:', error));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">
          Şirket Listesi
        </Typography>
        <Button variant="contained" onClick={() => setCreateOpen(true)}>
          Yeni Şirket Ekle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Adı</TableCell>
              <TableCell align="right">Düzenle</TableCell>
              <TableCell align="right">Sil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => editRow(row)}
                  >
                    Düzenle
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => deleteCompany(row.id)}
                  >
                    Sil
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {companies.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Kayıtlı şirket bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddCompany
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        getCompanies={getCompanies}
      />


      <EditCompany
        open={editOpen}
        onClose={() => setEditOpen(false)}
        getCompanies={getCompanies}
        updateCompany={selectedCompany}
      />
    </Box>
  );
}

export default CompanyTable;