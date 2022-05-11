import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db"); // create a database (file) called places.db

export const init = () => {
  const promise = new Promise<void | SQLite.SQLError | SQLite.SQLResultSet>(
    (resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        // tx.executeSql(`DROP TABLE IF EXISTS placess`);
        // tx.executeSql(`DROP TABLE IF EXISTS places`);
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)",
          [],
          () => {
            resolve(); //type void will do the trick
          },
          (_, err) => {
            reject(err);
            return true;
          }
          /*
        SQLStatementErrorCallback returns a boolean value.

        true - ends the execution of the transaction. true is returned if there is no callback function specified as a parameter. Important: When true is returned, the transaction is rolled back.
        false - continues executing the transaction.
        */
        );
      }); // start a transaction
    }
  );
  return promise;
}; // create a function called init

export const insertPlace = (
  title: string,
  imageUri: string,
  address: string,
  lat: number,
  lng: number
) => {
  const promise = new Promise<void | SQLite.SQLError | SQLite.SQLResultSet>(
    (resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        // in the query do not use ${} to inject value, use the ? instead as placeholders
        // values will be retrived from the parameters of the function
        tx.executeSql(
          `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
          [title, imageUri, address, lat, lng],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
            return true;
          }
        );
      });
    }
  );
  return promise;
};

export const queryPlaces = () => {
  const promise = new Promise<void | SQLite.SQLError | SQLite.SQLResultSet>(
    (resolve, reject) => {
      db.transaction((tx: SQLite.SQLTransaction) => {
        // in the query do not use ${} to inject value, use the ? instead as placeholders
        // values will be retrived from the parameters of the function
        tx.executeSql(
          `SELECT * FROM places`,
          [],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
            return true;
          }
        );
      });
    }
  );
  return promise;
};