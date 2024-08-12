
const db = require('./database');


db.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Test query failed:', err);
    } else {
        console.log('Database connection test successful:', results);
    }
});
