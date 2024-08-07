const {Router} = require('express');
const ProductManager = require('../Manager/ProductManager.js');
const router = Router();

const productos = new ProductManager('./src/mock/Productos.json')

router.get('/', async (req, res) => {

    const product = await productos.getProducts();
    res.render('home',{
        title: 'ComercioSport Club',
        product,
    })

})


router.get('/realtimeproducts', async (req, res) => {
    const product = await productos.getProducts();
    res.render('realtimeproducts',{
        title: 'ComercioSport Club',
        product,
    });
})


exports.viewsrouter = router;