import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import AddProductForm from '../components/AddProductForm';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import {BrowserRouter as Router} from 'react-router-dom';
import * as productService from '../services/productService'; 

jest.mock('../components/ProductFormWithTooltips', () => {
    return require('./mocks/ProductFormWithTooltips.mock').default;
});

jest.mock('../services/productService', () => ({
    addProduct: jest.fn(),
    getProducts: jest.fn(),
}));
describe('AddProductForm Component', () => {
    
    test('should render correctly', () => {
        
        render(
            <Provider store={store}>
                    <Router>

                <AddProductForm />
                </Router>,

            </Provider>
        );
        const element = screen.getByRole("heading");
        expect(element).toBeInTheDocument();
       
    });
    test('should render `Product Add` correctly', () => {
        
        render(
            <Provider store={store}>
                    <Router>

                <AddProductForm />
                </Router>,

            </Provider>
        );

        expect(screen.getByRole('heading', { name: /Product Add/i })).toHaveTextContent('Product Add');
    });
    it("should show error message when all the fields are not entered", () => {
        render(
        <Provider store={store}>
            <Router>

        <AddProductForm />
        </Router>,

        </Provider>
        );
        const buttonElement = screen.getByRole('button', { name: /save/i });
        fireEvent.click(buttonElement);
        const errorDiv = screen.getByRole('alert');
        expect(errorDiv).toHaveTextContent('Please enter a value for namePlease enter a value for pricePlease enter a value for SKUPlease enter a value for type');
    });

    it("should show error message when attribute for DVD is not entered", () => {
        render(
        <Provider store={store}>
            <Router>

        <AddProductForm />
        </Router>,

        </Provider>
        );
        const nameButton = screen.getByRole('textbox', {name: /name/i});
        fireEvent.change(nameButton, { target: { value: "Test Product" }});
        const priceButton = screen.getByRole('spinbutton', {name: /price/i});
        fireEvent.change(priceButton, { target: { value: 10 }});
        const SKUButton = screen.getByRole('textbox', {name: /SKU/i});
        fireEvent.change(SKUButton, { target: { value: "12345" }});
        const button = screen.getByRole('combobox');
        fireEvent.change(button, { target: { value: "DVD" }});
        const buttonElement = screen.getByRole('button', { name: /save/i });
        
        fireEvent.click(buttonElement);
 
        const errorDiv = screen.getByRole('alert');
        expect(errorDiv).toHaveTextContent('Please fill in all required DVD fields');
    });

    it("should show error message when attribute for Book is not entered", () => {
        render(
        <Provider store={store}>
            <Router>

        <AddProductForm />
        </Router>,

        </Provider>
        );
        const nameButton = screen.getByRole('textbox', {name: /name/i});
        fireEvent.change(nameButton, { target: { value: "Test Product" }});
        const priceButton = screen.getByRole('spinbutton', {name: /price/i});
        fireEvent.change(priceButton, { target: { value: 10 }});
        const SKUButton = screen.getByRole('textbox', {name: /SKU/i});
        fireEvent.change(SKUButton, { target: { value: "12345" }});
        const button = screen.getByRole('combobox');
        fireEvent.change(button, { target: { value: "Book" }});
        const buttonElement = screen.getByRole('button', { name: /save/i });
        
        fireEvent.click(buttonElement);
 
        const errorDiv = screen.getByRole('alert');
        expect(errorDiv).toHaveTextContent('Please fill in all required Book fields');
    });

    it("should show error message when attributes for Furniture are not entered", () => {
        render(
        <Provider store={store}>
            <Router>
                <AddProductForm />
            </Router>,
        </Provider>
        );
        const nameButton = screen.getByRole('textbox', {name: /name/i});
        fireEvent.change(nameButton, { target: { value: "Test Product" }});
        const priceButton = screen.getByRole('spinbutton', {name: /price/i});
        fireEvent.change(priceButton, { target: { value: 10 }});
        const SKUButton = screen.getByRole('textbox', {name: /SKU/i});
        fireEvent.change(SKUButton, { target: { value: "12345" }});
        const button = screen.getByRole('combobox');
        fireEvent.change(button, { target: { value: "Furniture" }});
        const buttonElement = screen.getByRole('button', { name: /save/i });
        
        fireEvent.click(buttonElement);
        const errorDiv = screen.getByRole('alert');
        expect(errorDiv).toHaveTextContent('Please fill in all required Furniture fields');
    });


    it("should show success message when all attributes are  entered", async () => {
        render(
        <Provider store={store}>
            <Router>

        <AddProductForm />
        </Router>,

        </Provider>
        );
        
        
        const nameButton = screen.getByRole('textbox', {name: /name/i});
        fireEvent.change(nameButton, { target: { value: "Test Product" }});
        
        const priceButton = screen.getByRole('spinbutton', {name: /price/i});
        fireEvent.change(priceButton, { target: { value: 10 }});
        
        const SKUButton = screen.getByRole('textbox', {name: /SKU/i});
        fireEvent.change(SKUButton, { target: { value: "12345" }});
        
        const button = screen.getByRole('combobox');
        fireEvent.change(button, { target: { value: "Book" }});
        
        const attribute = screen.getByPlaceholderText('Enter Weight', {name: /weight/i});
        fireEvent.change(attribute, { target: { value: 10 }});
        
        const buttonElement = screen.getByRole('button', { name: /save/i });
        fireEvent.click(buttonElement);

        productService.addProduct.mockResolvedValue({ message: 'Product added successfully!' });

        const sucessDiv = await waitFor(() => screen.getByRole("alert"));

        expect(sucessDiv).toHaveTextContent('Product added successfully!');
    });
})