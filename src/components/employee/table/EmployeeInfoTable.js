import React, { useState, useEffect } from "react";
import {
    Modal,
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

import EmployeeService from "../../../service/EmployeeService";
//employee iletişim bilgileri liste modalı
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
const EmployeeInfoTable = ({ open, onClose, id }) => {
    const [employeeInfos, setEmployeeInfo] = useState([]);
    useEffect(() => {
        if (id != null)
            getEmployeeInfos()
    }, [id]);

    const getEmployeeInfos = () => {
        EmployeeService.getEmployeecomInfos(id)
            .then(data => setEmployeeInfo(data))
            .catch(error => console.log('Hata:', error));
        console.log("dwd" + id)

    };
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>


                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tip</TableCell>
                                <TableCell>Bilgi</TableCell>
                                {/* <TableCell align="right">Düzenle</TableCell> */}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeInfos.map((row) => (
                                <TableRow
                                    key={row.id}
                                    hover
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.comTypeName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.unicInfo}
                                    </TableCell>
                                    {/* <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => editRow(row)}
                  >
                    Düzenle
                  </Button>
                </TableCell> */}

                                </TableRow>
                            ))}
                            {employeeInfos.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        Kayıtlı şirket bulunamadı.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>

        </Modal>
    );
}
export default EmployeeInfoTable;
