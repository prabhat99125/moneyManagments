import mongoose from "mongoose";

let isConnect = false;
export function connect() {
    if (isConnect) {
        console.log('existing database connect');
        return;
    }
    try {
        if (mongoose.connection.readyState === 1) {
            console.log('already connect database');
            isConnect = true;
            return;
        }
        mongoose.connect(process.env.db_url!)
            .then(() => {
                isConnect = true;
                console.log('Detabase conected');
            }).catch(() => {
                console.log('detabase conection error');
            })
    } catch {
        console.log('detabase conection error');

    }
}