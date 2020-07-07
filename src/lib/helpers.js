const bcrypt = require('bcryptjs');
const helpers = {};
const pool = require('../database/pool');
const fs = require('fs');
const png = require('pngjs').PNG;
const path = require('path')

helpers.encryptPass = async (pass) => {
    const stringHash = await bcrypt.genSalt(10);
    const finalPass = await bcrypt.hash(pass, stringHash);
    return finalPass;
};

helpers.matchPass = async (pass, savedPass) => {
    return await bcrypt.compare(pass, savedPass);
};

helpers.renderImg = async () => {
    const array = await pool.query('SELECT img FROM pruebaproducto');
    const { img } = array[0];
    const resul = png.sync.read(img);
    //console.log(resul);
    return resul;
};

helpers.getProduct = async () => {
    const query = "SELECT id,\
                    nombre,\
                    imgdir,\
                    descripcion,\
                    FORMAT(precio, 0) as precio,\
                    stock\
                   FROM `producto` WHERE stock > 0";
    const array = await pool.query(query);
    //console.log(array);
    return array;
};

helpers.verification = async (array) => {
    const query = "Select * from producto"
    var storageData = new Array()
    var matchedProduct = new Array()

    const response = await pool.query(query)



    //console.log('desde la bd ',response[0].stock)
    //console.log('desde LS ', array)

    mainLoop:
    for (let i = 0; i < array.length; i++) {
        secondLoop:
        for (let x = 0; x < response.length; x++) {
            if (response[x].id == array[i].id && response[x].stock > array[i].cantidad) {
                var productName = array[i].nombre
                matchedProduct.push({
                    producto: productName,
                    estado: true
                })
            } else {
                if (response[x].id == array[i].id) {
                    var productName = array[i].nombre
                    matchedProduct.push({
                        producto: productName,
                        estado: false
                    })
                }
            }
        }
    }

    return matchedProduct
}







module.exports = helpers;