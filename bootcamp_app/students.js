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
LIMIT 5;
`
  )
  .then(res => {
    res.rows.forEach(user => {
      console.log(
        `${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`
      );
    });
  });
