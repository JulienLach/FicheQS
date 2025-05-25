const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({});
