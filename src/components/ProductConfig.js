const productConfig = {
    DVD: {
      attributes: ['size'],
    },
    Book: {
      attributes: ['weight'],
    },
    Furniture : {
      attributes: ['length', 'width', 'height'],
      renderAttributes: (attributes) =>
        `Dimensions: ${attributes.length} x ${attributes.width} x ${attributes.height}`,
    },
  };
  
  export default productConfig;
  