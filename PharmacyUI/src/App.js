import { useEffect, useState } from 'react';
import axios from 'axios';
import MedicineList from './components/MedicineList';
import AddMedicine from './components/AddMedicine';
import { Container, Typography, Divider, TextField, Stack, Button } from '@mui/material';

export default function App() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');

  const loadMedicines = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/medicines?search=${search}`
    );
    setMedicines(res.data);
    setSearch('')
  };

  useEffect(() => {
    loadMedicines();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ my: 2 }}>
        ABC Pharmacy
      </Typography>

      <AddMedicine onAdded={loadMedicines} />

      <Divider sx={{ my: 3 }} />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          fullWidth
          label="Search Medicine"
          sx={{ my: 2 }}
          onChange={e => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={loadMedicines}>Search</Button>
      </Stack>
      <Divider sx={{ my: 3 }} />
      <MedicineList medicines={medicines} />
    </Container>
  );
}
