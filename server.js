const  express = require("express");
const  cluster = require('cluster');
const os =require("os");
const numCPUs = os.cpus().length;
const logger = require("./helper/logger");
const app = express();




if (cluster.isMaster) {  
    logger.info(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
    logger.warn(`Forking process number ${i}...`);
    }

    // Listen for dying workers
    cluster.on('exit', function (worker) {
        // Replace the dead worker, we're not sentimental
        logger.error(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
  } else {
        const userRoutes = require("./routes/userRoutes");
        app.use("/user",userRoutes)
        const PORT = process.env.PORT || 3000;
        app.use(express.json());

        app.get("/",(request,response)=>{
            response.send("Api server set and running for DigitalExplora ");
        });

        app.listen(3000,()=>{
            logger.info(`Server started in ${ PORT }`);
        });
  }
