class ProductController {
    constructor(){}

    getProducts(req,res){
        res.json(products);
    }

    createProducts(req, res) {
        const id = req.body.id;
        const name = req.body.name;
        const product = {id, name}
        products.push(product);
        res.status(201).json({product, message:"ok"})
    }

    updateProduct (req,res){
        
    }
}