//SOLID

import http from 'http';

const server = http.createServer((req, res)=>{
    if(req.url === '/users'){
        res.writeHead(200, 'ok', {"content-type":"application/json"});
        res.end(JSON.stringify(users));
    }
    else if(req.url === '/home'){
        res.writeHead(200, 'ok', {"content-type":"text/html"});
        res.end(`
            <hr1>HOME PAGE</hr1>
            <p>Welcome, ${users[0].name}</p>
            `) //SSR
    }
    else{
        res.statusCode=404;
        res.end('not found');
    }
    
    res.end('server running');
});

server.listen(3000, ()=>{
    console.log('server is running on port: 3000');
});