/**
 * Created by konstantin on 11.4.16.
 */
'use strict';

const mysql = require ("mysql");
const mysqlUtilities = require('mysql-utilities');

module.exports = function(dbConfig, tableName) {
    const pool = mysql.createPool(dbConfig);
    const Tasks = {
        all: (callback) => {
            pool.getConnection((err, connection) => {
                connection.query("SELECT * FROM " +  mysql.escapeId(tableName) + " ORDER BY datetime ASC", (err, rows) => {
                    callback(err, rows);
                    connection.release();
                });
            });
        },

        save: (id, title, content, callback) => {
            pool.getConnection((err, connection) => {
                mysqlUtilities.upgrade(connection);
                mysqlUtilities.introspection(connection);
                if(id == 0) {
                    connection.insert(tableName, {title: title, content: content}, (err, recordId) => {
                        recordId = (recordId !== undefined) ? recordId : false;
                        callback(err, recordId);
                        connection.release();
                    });
                }
                else {
                    connection.update(tableName, {title: title, content: content}, {id:id}, (err, affectedRows) => {
                        callback(err, id);
                        connection.release();
                    });
                }
            });
        },

        view: (id, callback) => {
            pool.getConnection((err, connection) => {
                connection.query("SELECT * FROM " +  mysql.escapeId(tableName) + " WHERE id = ?", id , (err, article) => {
                    callback(err, article);
                    connection.release();
                });
            });
        },

        edit: (id, callback) => {
            pool.getConnection((err, connection) => {
                mysqlUtilities.upgrade(connection);
                mysqlUtilities.introspection(connection);
                connection.select(tableName, '*', {id: id}, (err, result) => {
                    callback(err, result);
                    connection.release();
                });
            });
        },
        
        delete: (id, callback) => {
            pool.getConnection((err, connection) => {
                connection.query("DELETE FROM " +  mysql.escapeId(tableName) + " WHERE id = ?", id , (err) => {
                    callback(err);
                    connection.release();
                });
            });
        }
    };
    
    return Tasks;
};