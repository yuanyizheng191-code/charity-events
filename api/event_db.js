const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2004yyzdlxx',   
    database: 'charityevents_db',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Connection error:', err.message);
        return;
    }
    console.log('✅ Connected to charityevents_db');
});

module.exports = connection;