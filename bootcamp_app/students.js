const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "bootcampx",
});

pool
  .query(
    `
SELECT students.id, students.name, cohorts.name AS cohort_name
FROM students
  INNER JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};
`
  )
  .then(res => {
    res.rows.forEach(row => {
      console.log(
        `${row.name} has an id of ${row.id} and was in the ${row.cohort_name} cohort`
      );
    });
  })
  .catch(err => console.error("query error", err.stack));
