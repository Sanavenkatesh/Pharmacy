import { Button, TextField, Stack } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function AddMedicine({ onAdded }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const submit = async (data) => {
        await axios.post("http://localhost:5000/api/medicines", data);
        reset();
        onAdded();
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Stack spacing={3}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                        fullWidth
                        label="Medicine Name"
                        {...register("fullName", { required: "Medicine name is required" })}
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                    />

                    <TextField
                        fullWidth
                        label="Brand"
                        {...register("brand", { required: "Brand is required" })}
                        error={!!errors.brand}
                        helperText={errors.brand?.message}
                    />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Expiry Date"
                        InputLabelProps={{ shrink: true }}
                        {...register("expiryDate", { required: "Expiry date is required" })}
                        error={!!errors.expiryDate}
                        helperText={errors.expiryDate?.message}
                    />

                    <TextField
                        fullWidth
                        label="Quantity"
                        type="number"
                        {...register("quantity", {
                            required: "Quantity is required",
                            min: { value: 1, message: "Quantity must be at least 1" },
                        })}
                        error={!!errors.quantity}
                        helperText={errors.quantity?.message}
                    />
                </Stack>

                <TextField
                    label="Price"
                    type="number"
                    {...register("price", {
                        required: "Price is required",
                        min: { value: 0, message: "Price must be positive" },
                    })}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                />

                <TextField
                    label="Notes"
                    multiline
                    rows={3}
                    {...register("notes")}
                />

                <Button variant="contained" type="submit">
                    Save
                </Button>
            </Stack>
        </form>
    );
}
