import mysql from 'mysql';


export const connection = () => {
        let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Tuhin@2025",
        database: "jkkniu-mart"
    });
    return con;
}
