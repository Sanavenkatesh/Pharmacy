import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import dayjs from 'dayjs';


export default function MedicineList({ medicines }) {

    const getRowStyle = (m) => {
        if (dayjs(m.expiryDate).diff(dayjs(), 'day') < 30) return { background: '#f8b4b4' };
        if (m.quantity < 10) return { background: '#ffe08a' };
        return {};
    };


    return (
        <Paper sx={{ p: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Expiry</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {medicines.map(m => (
                        <TableRow key={m.id} style={getRowStyle(m)}>
                            <TableCell>{m.fullName}</TableCell>
                            <TableCell>{m.brand}</TableCell>
                            <TableCell>{dayjs(m.expiryDate).format('DD-MM-YYYY')}</TableCell>
                            <TableCell>{m.quantity}</TableCell>
                            <TableCell>₹{m.price.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}