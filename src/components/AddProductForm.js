    import {React, useState} from 'react';
    import { useNavigate, useLocation } from 'react-router-dom';
    
    import Product from '../models/Product';
    import DVDProductForm from '../productForms/DVDProductForm';
    import BookProductForm from '../productForms/BookProductForm';
    import FurnitureProductForm from '../productForms/FurnitureProductForm';
    import '../styles/form.css';
    import { connect } from 'react-redux';
    import {Button} from 'react-bootstrap';
    import { addProduct, setFormField } from '../store/action'; // Import the relevant actions



    const AddProductForm = ({ formState, addProduct, setFormField }) => {
        
        const { name, price, SKU, type, attributes } = formState;

        
        const navigate = useNavigate();
        
        const [nameError,  setNameError] = useState('');
        const [priceError, setPriceError] = useState('');
        const [skuError, setSKUError] = useState('');
        const [typeError, setTypeError] = useState('');

        const handleFieldChange = (event) => {
            const { name, value } = event.target;
            if (name === 'name') {
                setNameError('');
              } else if (name === 'price') {
                setPriceError('');
              } else if (name === 'SKU') {
                setSKUError('');
              } else if (name === 'type') {
                setTypeError('');
              }
              setFormField(name, value);

        };
    
        const handleAttributeChange = (attributeName, attributeValue) => {
            const newAttributes = {
              ...attributes,
              [attributeName]: attributeValue,
            };
            setFormField('attributes', newAttributes); // This dispatches the action for the attributes object
          };
        
        const displayAlert = (message, type) => {
        const alertContainer = document.getElementById('alert-container');
        alertContainer.innerHTML = `
            <div class="alert alert-${type}" role="alert">
            ${message}
            </div>
        `;
        setTimeout(() => {
            alertContainer.innerHTML = ''; 
        }, 5000); 
        };
        const handleSubmit = async (event) => {
                event.preventDefault();
                const requiredFields = {
                    DVD: ['size'],
                    Book: ['weight'],
                    Furniture: ['height', 'width', 'length'],
                };
        
                const basicRequiredFields = ['name', 'price', 'SKU', 'type'];
                const individualFieldErrors = [];
                
                basicRequiredFields.forEach(field => {
                  if (!formState[field] || formState[field].trim() === '') {
                    individualFieldErrors.push(`Please enter a value for ${field}`);
                  }
                });
                
                if (individualFieldErrors.length > 0) {
                  const errorMessage = individualFieldErrors.join('<br>'); 
                
                  displayAlert(errorMessage, 'danger');
                  return;
                }
                
                const type = formState.type;
                if (requiredFields[type]) {
                    const missingFields = requiredFields[type].filter(field => !formState.attributes[field] || formState.attributes[field] <= 0);
                    if (missingFields.length > 0) {
                        const typeLabel = type === 'DVD' ? 'DVD' : (type === 'Book' ? 'Book' : 'Furniture');
                        displayAlert(`Please fill in all required ${typeLabel} fields`, 'danger');
                        return;
                    }
                }
               
            
                const product = new Product(name, price, attributes, SKU, type);
                try {
                    await addProduct(product);
                    displayAlert('Product added successfully!', 'success');
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } catch (error) {
                    console.error('Error adding product:', error);
                    displayAlert('Falied to add product. Please try again.', 'danger');
                }
                
            
        };

        const typeSpecificFields = {
            DVD: <DVDProductForm handleAttributeChange={handleAttributeChange} />,
            Book: <BookProductForm handleAttributeChange={handleAttributeChange} />,
            Furniture: <FurnitureProductForm handleAttributeChange={handleAttributeChange} />,
        };
        
        return (
            <div id='product_form'> 
                <header className='form-header'>
                    <div>
                        <h2 id="product-header">Product Add</h2>
                    </div>
                    <Button onClick={handleSubmit} variant="success" >Save</Button>
                </header>
                <hr></hr>
                <div id="alert-container"></div>
                <form className="form-container" id='product_form'>
                    
                    <label htmlFor="name" className="label-style">Name: </label>
                    <input
                        className="input-style"
                        type="text"
                        id="name"
                        value={name}
                        name="name"
                        onChange={handleFieldChange}
                        onBlur={() => !name && setNameError('Please enter a value for Name')}
                    />
                    {nameError && <span className="input-message error-message">{nameError}</span>}

                    <label htmlFor="price" className='label-style'>Price:</label>
                    <input
                        className="input-style"
                        type="number"
                        id="price"
                        name="price"
                        value={price}
                        onChange={handleFieldChange}
                        onBlur={() => !price && setPriceError('Please enter a value for Price')}
                    />
                    {priceError && <span className="input-message error-message">{priceError}</span>}
                    
                    <label htmlFor="sku" className="label-style">SKU: </label>
                    <input
                        className="input-style"
                        type="text"
                        id="sku"
                        value={SKU}
                        name="SKU"
                        onChange={handleFieldChange}
                        onBlur={() => !SKU && setSKUError('Please enter a value for SKU')}
                    />
                    {skuError && <span className="input-message error-message">{skuError}</span>}

                    <label htmlFor="type" className='label-style'>Type:</label>
                    <select
                        className="select-style"
                        id="productType"
                        value={type}
                        name="type"
                        onChange={handleFieldChange}
                        onBlur={() => !type && setTypeError('Please select a product type')}
                    >                        
                        <option value="">Select a type</option>
                        <option value="DVD">DVD</option>
                        <option value="Book">Book</option>
                        <option value="Furniture">Furniture</option>
                    </select>
                    
                    {typeError && <span className="input-message error-message">{typeError}</span>}

                    {typeSpecificFields[type]}

                    <button className='button-style' type="button" onClick={() => navigate('/')}>
                        Cancel
                    </button>    
                </form>
            </div>
        );
    };

const mapStateToProps = (state) => ({
    formState: state.addProductForm,
});
    
const mapDispatchToProps = {
    addProduct,
    setFormField,
};
      
export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm);
