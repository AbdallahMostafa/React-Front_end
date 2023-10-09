import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import React from 'react';
import FurnitureProductForm from '../productForms/FurnitureProductForm';

jest.mock('../components/ProductFormWithTooltips', () => {
    return require('./mocks/ProductFormWithTooltips.mock').default;
});
describe('FurnitureProductFrom Component', () => {
    
    test('should render correctly', () => {
        
        render(
            <FurnitureProductForm>

            </FurnitureProductForm>
        );

        const elementWidth = screen.getByPlaceholderText("Enter Width");
        const elementHeight = screen.getByPlaceholderText("Enter Height");
        const elementLength = screen.getByPlaceholderText("Enter Length");

        expect(elementWidth).toBeInTheDocument();
        expect(elementHeight).toBeInTheDocument();
        expect(elementLength).toBeInTheDocument();
       
    });



    it('should render FurnitureProductForm with mocked ProductFormWithTooltips', () => {
        render(<FurnitureProductForm />);
        const mockProductForm = screen.getAllByTestId('mock-tooltip', {name: /Enter width in KG/i})[0];
        expect(mockProductForm).toBeInTheDocument();
        expect(mockProductForm).toHaveTextContent('Enter width in KG');
      });
    

      it('should render FurnitureProductForm with mocked ProductFormWithTooltips', () => {
        render(<FurnitureProductForm />);
        const mockProductForm = screen.getAllByTestId('mock-tooltip', {name: /Enter height in cm/i})[1];
        expect(mockProductForm).toBeInTheDocument();
        expect(mockProductForm).toHaveTextContent('Enter height in cm');
      });

      it('should render FurnitureProductForm with mocked ProductFormWithTooltips', () => {
        render(<FurnitureProductForm />);
        const mockProductForm = screen.getAllByTestId('mock-tooltip', {name: /Enter length in cm/i})[2];
        expect(mockProductForm).toBeInTheDocument();
        expect(mockProductForm).toHaveTextContent('Enter length in cm');
      });
    
      it('should handle attribute change for width input', () => {
        const handleAttributeChange = jest.fn(); 
        
        const { getByLabelText } = render(
          <FurnitureProductForm handleAttributeChange={handleAttributeChange} />
        );
    
        const widthInput = getByLabelText('Width:'); 
        
        fireEvent.change(widthInput, { target: { value: '10' } });
    
        expect(handleAttributeChange).toHaveBeenCalledWith('width', '10');
      });
      it('should handle attribute change for width input', () => {
        const handleAttributeChange = jest.fn(); 
        
        const { getByLabelText } = render(
          <FurnitureProductForm handleAttributeChange={handleAttributeChange} />
        );
    
        const heightInput = getByLabelText('Height:');
        
        fireEvent.change(heightInput, { target: { value: '10' } });
    
        expect(handleAttributeChange).toHaveBeenCalledWith('height', '10');
      });

      it('should handle attribute change for length input', () => {
        const handleAttributeChange = jest.fn(); 
        
        const { getByLabelText } = render(
          <FurnitureProductForm handleAttributeChange={handleAttributeChange} />
        );
    
        const lengthInput = getByLabelText('Length:'); 
        
        fireEvent.change(lengthInput, { target: { value: '10' } });
    
        expect(handleAttributeChange).toHaveBeenCalledWith('length', '10');
      });
})