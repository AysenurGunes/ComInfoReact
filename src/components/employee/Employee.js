
import EmployeeTable from "./table/EmployeeTable";
import {
    Box,
    Typography,
    Paper
} from '@mui/material';
//employee sayfası
const Employee = () => {

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Personeller
            </Typography>

            <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
                <EmployeeTable />
            </Paper>
        </Box>
    );
}
export default Employee