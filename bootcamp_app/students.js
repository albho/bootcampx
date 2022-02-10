const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "bootcampx",
});

const queryString = `
  SELECT
    students.id as student_id,
    students.name as name,
    cohorts.name as cohort
  FROM students
    INNER JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
    LIMIT $2;
  `;
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
const values = [`%${cohortName}%`, limit];

pool
  .query(queryString, values)
  .then(res => {
    res.rows.forEach(row => {
      console.log(
        `${row.name} has an id of ${row.student_id} and was in the ${row.cohort} cohort`
      );
    });
  })
  .catch(err => console.error("query error", err.stack));
