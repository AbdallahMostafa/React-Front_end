import {render, screen, fireEvent} from '@testing-library/react';
import React from 'react';
import DVDProductForm from '../productForms/DVDProductForm';

jest.mock('../components/ProductFormWithTooltips', () => {
    return require('./mocks/ProductFormWithTooltips.mock').default;
});
describe('DVDProductForm Component', () => {
    
    test('should render correctly', () => {
        
        render(
            <DVDProductForm></DVDProductForm>

        );

        const elementSize = screen.getByPlaceholderText("Enter Size");
        expect(elementSize).toBeInTheDocument();
   
       
    });



    it('should render DVDProductForm with mocked ProductFormWithTooltips', () => {
        render(<DVDProductForm />);
        const mockProductForm = screen.getByTestId('mock-tooltip', {name: /Enter Size in MB/i});
        expect(mockProductForm).toBeInTheDocument();
        expect(mockProductForm).toHaveTextContent('Enter Size in MB');
      });
    


    it('should handle attribute change for weight input', () => {
    const handleAttributeChange = jest.fn(); 
    
    const { getByLabelText } = render(
        <DVDProductForm handleAttributeChange={handleAttributeChange} />
    );

    const sizeInput = getByLabelText('Size:'); 
    
    fireEvent.change(sizeInput, { target: { value: '10' } });

    
    expect(handleAttributeChange).toHaveBeenCalledWith('size', '10');
    });

})