const config = require("./config");
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
    //   "CREATE TABLE IF NOT EXISTS LU_hack.Users (UserID INT PRIMARY KEY,NID VARCHAR(255) UNIQUE,Username VARCHAR(255),Password VARCHAR(255),Email VARCHAR(255),FirstName VARCHAR(255),LastName VARCHAR(255),DateOfBirth DATE,PhoneNumber VARCHAR(15),Address VARCHAR(255),VerificationStatus VARCHAR(50))",
    
    //   (error) => {
    //     if (error) {
    //       console.log(`error occurred while creating users table ${error}`);
    //     } else {
    //       console.log("users table created");
    //     }
    //   }
    // );

    // const port = 8282;

    app.listen(port, () => {
      console.log(`app listening on port ${port} | http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Failed to connect", error);
  }
}

main();
