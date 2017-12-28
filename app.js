var mysql = require('mysql');
require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'prod',
    password: 'iwWGQ2tPY^y6qlP7',
    database : 'node_mysql'
});

var sql_stmt = "";

function getArgument(argument){
    var index = process.argv.indexOf(argument);
    console.log(process.argv, argument);

    return (index === -1) ? null : process.argv[index + 1];
}

connection.connect(function(error){
    if(error){
        console.log();
        console.log('The following error occured while trying to connect to MySQL ' + error.message);
        return;
    }
    console.log();
    console.log('Connection to MySQL established successfully');

});

function listRecords(){
    sql_stmt = "SELECT * FROM artists;";

    connection.query(sql_stmt,function (err, rows){
        console.log();
        console.log("Artists Listing");
        console.log();

        console.table(rows);

        console.log("Total rows returned: " + rows.length);
    });
}

function addRecord(){
    var name = getArgument('--name');
    var genre = getArgument('--genre');
    var label = getArgument('--label');
    var country = getArgument('--country');

    sql_stmt = "INSERT INTO artists(artist_name,genre,label,country) VALUES (?,?,?,?)";


    var values = [name, genre, label,country];

    sql_stmt = mysql.format(sql_stmt, values);

    connection.query(sql_stmt, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Created new artist with id ' + result.insertId);
    })
}

function updateRecord(){
    var id = getArgument('--id');
    var name = getArgument('--name');
    var genre = getArgument('--genre');
    var label = getArgument('--label');
    var country = getArgument('--country');

    sql_stmt = "UPDATE artists SET artist_name = ?,genre = ?,label = ?,country = ? WHERE id = ?";

    var values = [name, genre, label,country,id];

    sql_stmt = mysql.format(sql_stmt, values);

    connection.query(sql_stmt, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Updated artist with id ' + id);
    })
}

function deleteRecord(){
    var id = getArgument('--id');

    sql_stmt = "DELETE FROM artists WHERE id = ?";

    var artist_id = [id];

    sql_stmt = mysql.format(sql_stmt, artist_id);

    connection.query(sql_stmt, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Deleted artist with id ' + id);
    })
}

var action = getArgument('--action');

switch(action){
    case "add":
        addRecord();
        break;

    case "update":
        updateRecord();
        break;

    case "delete":
        deleteRecord();
        break;
}

listRecords();

connection.end(function(error) {
    if (error){
        console.log('The following error occured while trying to connect to MySQL ' + error.message);
    }else{
        console.log();
        console.log('Connection to MySQL established closed');
    }
});