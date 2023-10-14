const app = require("./app");
const { port } = require("./config");
const pool = require("./pool");

async function main() {
  try {
    pool.connect((error) => {
      if (error) {
        console.log(`error occurred while connecting ${error}`);
      } else {
        console.log("connection created with Mysql successfully");
      }
    });

    // pool.query(
    //   "CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, gender ENUM('Male', 'Female', 'Other') NOT NULL, designation VARCHAR(255), phoneNumber VARCHAR(15) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL )",
    //   (error) => {
    //     if (error) {
    //       console.log(`error occurred while creating users table ${error}`);
    //     } else {
    //       console.log("users table created");
    //     }
    //   }
    // );

    app.listen(port, () => {
      console.log(`app listening on port ${port} | http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Failed to connect", error);
  }
}

main();
