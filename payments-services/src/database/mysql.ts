import mysql from "mysql2/promise";
import {Signale} from "signale";
import config from "../config/config";

const signale = new Signale();

const configDB = {
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    waitForConnections:true,
    connectionLimit:10
}

const pool = mysql.createPool(configDB);

export async function query(sql:string, params:any[]) {
    const conn = await pool.getConnection();
    signale.success('Conexion a la base de datos exitosa');
    try {
        const result = await conn.execute(sql, params);
        conn.release();
        return result;
    }catch(error) {
        signale.error(error);
        return null;
    }finally {
        signale.complete("Closing MySQL connection");
        await conn.release();
    }
}