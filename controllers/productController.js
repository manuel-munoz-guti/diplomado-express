const fs = require("fs");

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.updateProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const productUpdated = req.body;
  const { id } = req.params;

  const foundProduct = products.find((p) => p.id == id);
  
  if (foundProduct) {
    const productArr = products.map( (element) => (element.id == id) ? productUpdated : element  );
    
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(productArr));
    
    return res.status(200).json({
      status: "PUT success",
      data: {
        product: productUpdated,
      },
    });
  } else {
    
    return res.status(404).json({
      status: "Not found",
    });
  }
}


exports.deleteProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const { id } = req.params;

  const foundProduct = products.find((p) => p.id == id);
  
  if (foundProduct) {
    
    const productArr = products.filter( (element) => element.id != id );
    
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(productArr));
    
    return res.status(200).json({
      status: "DELETE success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    
    return res.status(404).json({
      status: "Not found",
    });
  }
}