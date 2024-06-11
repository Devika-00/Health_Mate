
import configKeys from "../../config";
import { Server } from "http";

const server = (app:Server)=>{
    app.listen(configKeys.PORT,()=>
    console.log(`Server listening on http://localhost:${configKeys.PORT}`)
    );
}
export default server;