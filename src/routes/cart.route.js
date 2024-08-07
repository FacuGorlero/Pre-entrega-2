const { Router } =  require('express');
const { CartManager} = require('../Manager/CartManager.js');

const router = Router()
const carrito = new CartManager('./src/mock/Cart.json')

router.get('/:cid', async (req,res)=>{
    const id = req.params.cid
    const resp = await carrito.getCarts(5)
    if (typeof (resp) === "string") {
        res.status(400).json({
          status: "fail",
          data: resp
      })} else {
        res.status(200).json({
          status: "ok",
          data: resp
      })}
    })

    router.post('/' , async (req, res) => {

        const id = await carrito.create()
      
        res.status(200).json({
          status: "ok",
          data: id
      })
      })

      router.post('/:cid/product/:pid' , async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
      
        const resp = await carrito.addProduct(cid,pid)
      
        if (typeof (resp) === "string") {
          res.status(400).json({
            status: "fail",
            data: resp
        })} else {
          res.status(200).json({
            status: "ok",
            data: resp
        })}
      })
      

exports.cartsRouter = router;