import React from 'react';
import ProductFormWithTooltips from '../components/ProductFormWithTooltips';

const DVDProductForm = ({ handleAttributeChange }) => {
  return (
    <div>
      <label htmlFor="size" className='lable-style'>Size:</label>
      <ProductFormWithTooltips title="Enter Size in MB">
        <input className="input-style" type="number" id="#size" name="size" placeholder="Enter Size" onChange={(e) => handleAttributeChange('size', e.target.value)} />
      </ProductFormWithTooltips>
    </div>
  );
};

export default DVDProductForm;
