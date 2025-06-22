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
import AddEmployee from "../form/AddEmplooye";
import EditEmployee from "../form/EditEmployee";
import EmployeeService from "../../../service/EmployeeService";
import EmployeeInfoTable from "./EmployeeInfoTable";


const EmployeeTable = () => {

  const [employees, setEmployee] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [empId, setEmpId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    getEmployees()
  }, []);

  const getEmployees = () => {
    EmployeeService.getEmployees()
      .then(data => setEmployee(data))
      .catch(error => console.log('Hata:', error));

  };
   const employeeComRow = (employee) => {
    setEmpId(employee.id);
    setInfoOpen(true);
  };

  const editRow = (employee) => {
    setSelectedEmployee(employee);
    setEditOpen(true);
  };

  const deleteEmployee = (id) => {
    EmployeeService.deleteEmployee(id)
      .then(() => getEmployees())
      .catch(error => console.log('Hata:', error));
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">
          Personel Listesi
        </Typography>
        <Button variant="contained" onClick={() => setCreateOpen(true)}>
          Yeni Personel Ekle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Adı</TableCell>
              <TableCell>Şirket</TableCell>
              <TableCell align="right">İletişim Bilgisi</TableCell>
              <TableCell align="right">Düzenle</TableCell>
              <TableCell align="right">Sil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                 <TableCell component="th" scope="row">
                  {row.companyName}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => employeeComRow(row)}
                  >
                    İletişim
                  </Button>
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
                    onClick={() => deleteEmployee(row.id)}
                  >
                    Sil
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {employees.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Kayıtlı personel bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddEmployee
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        getEmployees={getEmployees}
      />
  <EmployeeInfoTable
        open={infoOpen}
        onClose={()=>setInfoOpen(false)}
        id={empId}
      />

      <EditEmployee
        open={editOpen}
        onClose={() => setEditOpen(false)}
        getEmployees={getEmployees}
        updateEmployee={selectedEmployee}
      />
    </Box>
  );
}

export default EmployeeTable;