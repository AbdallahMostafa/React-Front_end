import React, {useEffect} from 'react';
import productService from '../services/productService';
import { Card, CardGroup } from 'react-bootstrap';
import '../styles/productList.css';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { setProducts, toggleProductSelection, deleteSelectedProducts } from '../store/action';
import { connect } from 'react-redux';
import productConfig from './ProductConfig';
import '../styles/productList.css';

const ProductList = ( {products, loading, selectedProducts, setProducts, toggleProductSelection,  deleteSelectedProducts}) => {

   
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const productData = await productService.getProducts();
            setProducts(productData); // Dispatching action to update products in the Redux store
        } catch(error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = () => {
        deleteSelectedProducts(selectedProducts); // Dispatching action to delete selected products in the Redux store
    }

    const handleCheckboxChange = (productId) => {
        toggleProductSelection(productId); // Dispatching action to toggle product selection in the Redux store
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    
    const attributeUnitMap = {
        size: 'MB',
        weight: 'KG',
        length: 'cm',
        height: 'cm',
    };
    
    const renderAttributes = (product) => {
        const config = productConfig[product.type];
        if (!config) {
          return null;
        }
    
        const { attributes } = product;
        let renderedAttributes = "";

        if (config.renderAttributes) {
            renderedAttributes = config.renderAttributes(attributes);
        } else {
            renderedAttributes = config.attributes
            .map((attrKey) => `${attrKey}: ${attributes[attrKey]} ${attributeUnitMap[attrKey]}`)
            .join(" "); // Join attributes with a space separator
        }

        // Render the attributes
        return <Card.Text>{renderedAttributes}</Card.Text>;
    };
    return (
        <div> 
            <header className="header-contaier">
                <h2> Product List </h2>
                <div className="container-div">
                        <div>
                            <Link to="/add-product">
                                <Button variant="primary">Add Product</Button>
                            </Link>
                            <Button variant="danger" onClick={handleDelete}>
                                Mass Delete
                            </Button>
                    </div>
                </div>
            </header>
            {Array.isArray(products) && products.length > 0 ? (
                 <CardGroup>
                {products.map((product) => (
                    <Card key={product.id} className="product-card">
                        <div className="custom-control custom-checkbox checkbox-top-left">
                            <input
                            type="checkbox"
                            className="custom-control-input"
                            id={`checkbox-${product.id}`}
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleCheckboxChange(product.id)}
                            />
                            <label
                                className="custom-control-label"
                                htmlFor={`checkbox-${product.id}`}
                            ></label>
                        </div>
                        <Card.Body className="card-body">
                            <Card.Title>{product.SKU}</Card.Title>
                            <Card.Text>{product.name}</Card.Text>
                            <Card.Text className="mb-2 text-muted">{product.price} $</Card.Text>
                         
                            {renderAttributes(product)}

                        </Card.Body>
                    </Card>
            ))}
            </CardGroup>   
            ) : (
                <p>No products found.</p>
            )}  
        </div>   
    );
};

const mapStateToProps = (state) => ({
    products: state.products.products,
    loading: state.products.loading,
    selectedProducts: state.products.selectedProducts,
});
  
const mapDispatchToProps = {
    setProducts,
    toggleProductSelection,
    deleteSelectedProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

