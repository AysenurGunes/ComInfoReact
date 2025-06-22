
import CompanyTable from "./table/CompanyTable";
import {
    Box,
    Typography,
    Paper
} from '@mui/material';

const Company = () => {

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Şirketler
            </Typography>

            <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
                <CompanyTable />
            </Paper>
        </Box>
    );
}
export default Company