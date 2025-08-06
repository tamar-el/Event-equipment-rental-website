import React, { useState } from 'react';
import './Card.css';
import { addNewTrampoline } from './trampolineSlice'
import { useDispatch } from 'react-redux';
const AddProductCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    category: 'wet',
    pricePerHour: '',
    description: '',
    ages: '',
  });
  const dis = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger
    try {
      const response = await dis(addNewTrampoline(formData))

      if (response.meta.requestStatus == "fulfilled") {
        // איפוס הטופס או הצגת הודעה
        setFormData({ name: "", price: "", category: "", pricePerHour: "", ages: "" }); // אפס את כל השדות
        alert("המוצר נוסף בהצלחה!");
      } else {
        alert("שגיאה בהוספת מוצר");
      }
    } catch (err) {
      alert("שגיאה בשרת");
    }
  };

  return (
    <div className="add-product-card">
      <h2>הוספת מוצר חדש</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} required placeholder="למשל: מתנפח דינוזואר" />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="קישור לתמונה או קובץ" />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="wet">רטוב</option>
          <option value="dry">יבש</option>
          <option value="gymbory">גימבורי</option>
          <option value="park">פארק</option>
        </select>
        <input type="number" name="pricePerHour" value={formData.pricePerHour} onChange={handleChange} required placeholder="₪ מחיר לשעה" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="תיאור קצר של המתקן" />
        <input name="ages" value={formData.ages} onChange={handleChange} placeholder="גילאים מתאימים (למשל: 3-10)" />

        {/* <label>שם המוצר</label>
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
        <input name="ages" value={formData.ages} onChange={handleChange} /> */}

        <button type="submit">
           הוסף מוצר
        </button>
      </form>
    </div>
  );
};

export default AddProductCard;
