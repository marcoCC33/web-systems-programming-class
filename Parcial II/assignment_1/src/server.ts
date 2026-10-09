import express, { Application } from 'express';
import indexRoutes from './routes/index.ts';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        // Métodos de configuración
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // The server understands the JSON data that the client sends
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/v1', indexRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on PORT ${this.port}.`);
        });
    }
}

export default Server;