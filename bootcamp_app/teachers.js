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
    SELECT DISTINCT teachers.name AS teacher,
    cohorts.name AS cohort
  FROM assistance_requests
    INNER JOIN teachers ON assistance_requests.teacher_id = teachers.id
    INNER JOIN students ON assistance_requests.student_id = students.id
    INNER JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name = '${process.argv[2] || "JUL02"}'
  ORDER BY teacher;
`
  )
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  })
  .catch(err => console.error("query error", err.stack));
