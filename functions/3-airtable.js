require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
.base('appTZu6opXeFqVZHG')
.table('products')

exports.handler = async (event, context, cb) => {
    try{
        const { records } = await airtable.list()
        const products = records.map((product) => {
        const { id } = product
        const { name, price, images } = product.fields
        const url = images[0].url
        return { id, name, url, price }
    })
    return {
        statusCode: 200,
        body: JSON.stringify(products),
    }
    } catch(error){
    return {
        statusCode: 200,
        body: 'Airtable function',
    }}
}