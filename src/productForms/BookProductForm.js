import React from 'react';
import ProductFormWithTooltips from '../components/ProductFormWithTooltips';

const BookProductForm = ({ handleAttributeChange }) => {
  return (
    <div>
      <label htmlFor="weight">Weight:</label>
      <ProductFormWithTooltips title="Enter weight in KG">
        <input  className="input-style" type="number" id="#weight" name="weight" placeholder="Enter Weight"  onChange={(e) => handleAttributeChange('weight', e.target.value)} />
      </ProductFormWithTooltips>
    </div>
  );
};

export default BookProductForm;
