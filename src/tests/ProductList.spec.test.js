import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import ProductList from '../components/ProductList';
import configureMockStore from 'redux-mock-store';
import { toggleProductSelection, deleteSelectedProducts } from '../store/action';
import thunk from 'redux-thunk';
import * as productService from '../services/productService'; 

const middlewares = [thunk]

const mockStore = configureMockStore(middlewares);

jest.mock('../services/productService', () => ({
    deleteProducts: jest.fn(),
    getProducts: jest.fn(),
  }));
describe('ProductList Component', () => {
    
    test('should render correctly', () => {
        const mockProducts = [
            {
              id: 1,
              SKU: 'SKU123',
              name: 'Product 1',
              price: 19.99,
              type: 'DVD',
              attributes: {
                size: 500, 
            },
              
            },
            {
                id: 2,
                SKU: 'SKU456',
                name: 'Product 2',
                price: 39.99,
                type: 'Book',
                attributes: {
                    weight: 100, 
                }
            },
            {
                id: 3,
                SKU: 'SKU789',
                name: 'Product 3',
                price: 59.99,
                type: 'Furniture',
                attributes: {
                    width: 100, 
                    height: 100,
                    length: 100
                }
            },
            
        
        ];
        const store = mockStore({
            products: {
              products: mockProducts,
              loading: false,
              selectedProducts: [],
            },
          });
        render(
            <Provider store={store}>
                    <Router>
                        <ProductList />
                    </Router>,
            </Provider>
        );
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
        expect(screen.getByText('Product 3')).toBeInTheDocument();
    });

    test('should TOGGLE_PRODUCT_SELECTION payload equal the Proudct Id ', () => {
        const mockProducts = [
            {
              id: 1,
              SKU: 'SKU123',
              name: 'Product 1',
              price: 19.99,
              type: 'DVD',
              attributes: {
                size: 500, 
                },
              
            },
        ];
        const store = mockStore({
            products: {
              products: mockProducts,
              loading: false,
              selectedProducts: [],
            },
          });
        render(
            <Provider store={store}>
                    <Router>
                        <ProductList />
                    </Router>,
            </Provider>
        );

        const state = store.getState();

        store.dispatch(toggleProductSelection(state.products.products[0]['id']))

        const actions = store.getActions();

        expect(actions).toContainEqual({
            type: 'TOGGLE_PRODUCT_SELECTION',
            payload: state.products.products[0]['id'],
        });  
    });

    test('should dispatch DELETE_SELECTED_PRODUCTS action ', async() => {
       
        const mockProducts = [
            {
              id: 1,
              SKU: 'SKU123',
              name: 'Product 1',
              price: 19.99,
              type: 'DVD',
              attributes: {
                size: 500, 
            },
              
            },
            {
                id: 2,
                SKU: 'SKU456',
                name: 'Product 2',
                price: 39.99,
                type: 'Book',
                attributes: {
                    weight: 100, 
                }
            },
            {
                id: 3,
                SKU: 'SKU789',
                name: 'Product 3',
                price: 59.99,
                type: 'Furniture',
                attributes: {
                    width: 100, 
                    height: 100,
                    length: 100
                }
            },
            
        
        ];
        const selectedProductIds = [1, 3];
        const store = mockStore({ products: { selectedProducts: selectedProductIds } });
  
          render(
            <Provider store={store}>
                    <Router>
                        <ProductList />
                    </Router>,
            </Provider>
        );

        await store.dispatch(deleteSelectedProducts(selectedProductIds));
       
        expect(productService.deleteProducts).toHaveBeenCalledWith(selectedProductIds);

        const actions = store.getActions();
        expect(actions).toContainEqual({ type: 'TOGGLE_PRODUCT_SELECTION', payload: [] }); // Ensure that selectedProducts is cleared

    });
});
