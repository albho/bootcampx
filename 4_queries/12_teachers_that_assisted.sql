SELECT DISTINCT teachers.name AS teacher,
  cohorts.name AS cohort
FROM assistance_requests
  INNER JOIN teachers ON assistance_requests.teacher_id = teachers.id
  INNER JOIN students ON assistance_requests.student_id = students.id
  INNER JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name = 'JUL02'
ORDER BY teacher;