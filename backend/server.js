const  express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

const port = process.env.PORTSERVER || 5000

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use(cors({
  origin : 'http://localhost:5173',
  credentials : true
}))
app.use(express.static(path.join(__dirname , 'public')))

app.listen(port, (err) =>{
  if(err){
    console.log("une erreur s'est produit lors du démarrage du serveur ")
  }
  console.log(` app listening on port ${port}`)
})