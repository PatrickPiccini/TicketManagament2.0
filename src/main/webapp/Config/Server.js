const express = require('express');
const routes = require("./routes");
const app = express()
const PORT = 8080

app.use(routes);


app.get('/',(request, respose)=>{
    respose.send('Conexão estabelecida Get !')
});

app.post('/',(request, respose)=>{
    respose.send('Conexão estabelecida Post!')
});

app.listen(PORT,() => {
    console.log(`Server on em: http://localhost:${PORT}/`);
});



