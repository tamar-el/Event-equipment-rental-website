
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { putTrampoline } from '../trampoline/trampolineSlice'
import { useState } from 'react';
import './Card.css'
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// <Stack sx={{ width: '100%' }} spacing={2}>
//   <Alert severity="success">This is a success Alert.</Alert>
//   <Alert severity="info">This is an info Alert.</Alert>
//   <Alert severity="warning">This is a warning Alert.</Alert>
//   <Alert severity="error">This is an error Alert.</Alert>
// </Stack>

const EditProduct = () => {
    const location = useLocation();
    const item = location.state?.EditItem;

    const [formData, setFormData] = useState(item || {});
    const [upToDate, setupToDate] = useState(false);
    const [notUpToDate, setnotUpToDate] = useState(false);

    const dis = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        debugger
        try {

            const response = await dis(putTrampoline({ id: formData.id, updateItem: formData }))

            if (response.meta.requestStatus == "fulfilled") {
                setupToDate(true)

                setTimeout(() => {
                    setupToDate(false);
                }, 1000);
            } else {
                notUpToDate(true)
                 setTimeout(() => {
                    notUpToDate(false);
                }, 1000);
            }
        } catch (err) {
            alert("שגיאה בשרת");
        }
    };
    return (
        <>
            <div className="add-product-card">
                <h2>Edit Item</h2>
                <form onSubmit={handleSubmit}>
                    <label>שם המוצר</label>
                    <input name="name" value={formData.name} onChange={handleChange} required />

                    <label>תמונה (URL / נתיב)</label>
                    <input name="image" value={formData.image} onChange={handleChange} />

                    <label>קטגוריה</label>
                    <select name="category" value={formData.category} onChange={handleChange}>
                        <option value="wet">רטוב</option>
                        <option value="dry">יבש</option>
                        <option value="gymbory">גימבורי</option>
                        <option value="park">פארק</option>
                    </select>

                    <label>מחיר לשעה (₪)</label>
                    <input type="number" name="pricePerHour" value={formData.pricePerHour} onChange={handleChange} required />

                    <label>תיאור קצר</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} />

                    <label>גילאים מתאימים</label>
                    <input name="ages" value={formData.ages} onChange={handleChange} />

                    <button type="submit">
                        עדכן מוצר
                    </button>

                    {upToDate && <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="success">המוצר עודכן בהצלחה</Alert>
                    </Stack>
                    }
                    {notUpToDate && <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">שגיאה בעדכון המוצר  </Alert>
                    </Stack>
                    }

                </form>
            </div>
        </>
    );
}

export default EditProduct;