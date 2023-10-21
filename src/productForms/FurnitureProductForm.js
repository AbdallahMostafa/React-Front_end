import React from 'react';
import '../styles/furnitureForm.css';
import ProductFormWithTooltips from '../components/ProductFormWithTooltips';

const FurnitureProductForm = ({ handleAttributeChange,  }) => {
  return (
    <div>
      <div>
        <label htmlFor="width">Width:</label>
        <ProductFormWithTooltips title="Enter width in KG">
          <input  className="input-style" type="number" id="width" name="width" placeholder="Enter Width" onChange={(e) => handleAttributeChange('width', e.target.value)} />
        </ProductFormWithTooltips>

      </div>
      <div>
        <label htmlFor="height">Height:</label>
        <ProductFormWithTooltips title="Enter height in cm" className="input-style" >
          <input className="input-style" type="number" id="height" name="height" placeholder="Enter Height"  onChange={(e) => handleAttributeChange('height', e.target.value)} />
        </ProductFormWithTooltips>

      </div>
      <div>
        <label htmlFor="length">Length:</label>
        <ProductFormWithTooltips title="Enter length in cm">
          <input className="input-style" type="number" id="lenght" name="length" placeholder="Enter Length" onChange={(e) => handleAttributeChange('length', e.target.value)} />
        </ProductFormWithTooltips>

      </div>
    </div>
  );
};

export default FurnitureProductForm;
