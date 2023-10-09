import {render, screen, fireEvent} from '@testing-library/react';
import React from 'react';
import BookProductForm from '../productForms/BookProductForm';

jest.mock('../components/ProductFormWithTooltips', () => {
    return require('./mocks/ProductFormWithTooltips.mock').default;
});
describe('BookProductForm Component', () => {
    
    test('should render correctly', () => {
        
        render(
            <BookProductForm></BookProductForm>

        );

        const elementWeight = screen.getByPlaceholderText("Enter Weight");
        expect(elementWeight).toBeInTheDocument();
   
       
    });



    it('should render BookProductForm with mocked ProductFormWithTooltips', () => {
        render(<BookProductForm />);
        const mockProductForm = screen.getByTestId('mock-tooltip', {name: /Enter weight in KG/i});
        expect(mockProductForm).toBeInTheDocument();
        expect(mockProductForm).toHaveTextContent('Enter weight in KG');
      });
    


    it('should handle attribute change for weight input', () => {
    const handleAttributeChange = jest.fn(); 
    
    const { getByLabelText } = render(
        <BookProductForm handleAttributeChange={handleAttributeChange} />
    );

    const weightInput = getByLabelText('Weight:'); 
    
    fireEvent.change(weightInput, { target: { value: '10' } });

    expect(handleAttributeChange).toHaveBeenCalledWith('weight', '10');
    });

})