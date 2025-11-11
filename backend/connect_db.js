import mysql from 'mysql';


export const connection = () => {
        let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "jkkniu-mart"
    });
    return con;
}
