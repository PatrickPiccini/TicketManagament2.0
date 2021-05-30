const express = require('express');
const routes = require("./../Config/Routes");
const app = express()
const PORT = 8080
const cors = require('cors') 

app.use(cors())
app.use(routes);



app.get('/',(request, respose)=>{
    respose.send('Conexão estabelecida Get !')
});

app.post('/',(request, respose)=>{
    return respose.json(request.body)
});

app.listen(PORT,() => {
    console.log(`Server on em: http://localhost:${PORT}/`);
});



