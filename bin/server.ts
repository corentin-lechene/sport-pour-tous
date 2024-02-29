import {start_express} from "../src/infrastruture/express/main";

function start_server() {
    start_express().catch(console.error);
}

start_server();