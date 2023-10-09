import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/products';

const productService = {
    getProducts: async () => {
      try {
        const response = await axios.get(BASE_URL);
        return response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },
  
    addProduct: async (product) => {
      try {
        const response = await axios.post(BASE_URL, product);
        return response.data;
      } catch (error) {
        console.error('Error adding product:', error);
        throw error;
      }
    },
    deleteProducts: async (productIds) => {
      try {
        const response = await axios.delete(BASE_URL, {
          data: {
            productIds: productIds,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error deleting products:', error);
        throw error;
      }
    },
  };

export default productService;