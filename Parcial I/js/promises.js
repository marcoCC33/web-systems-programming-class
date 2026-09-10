//cosa robada del C

const findProduct = new Promise((result, reject)=>{
    const product = products.find(p=>p.price===1295);

    if(product){
        resolve(product);
        return;
    }
    reject("Product not found");
});

findProduct
    .then(p=>console.log(p))
    .catch(err=>console.error(err))
    .finally(()=>{
        isLoading = false;
        console.log('finally...');
    })