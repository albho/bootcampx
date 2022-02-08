SELECT AVG(total_durations.total_duration) AS average_total_duration
FROM (
    SELECT cohorts.name AS cohort,
      SUM(
        assistance_requests.completed_at - assistance_requests.started_at
      ) AS total_duration
    FROM cohorts
      INNER JOIN students ON cohorts.id = students.cohort_id
      INNER JOIN assistance_requests ON students.id = assistance_requests.student_id
    GROUP BY cohort
    ORDER BY total_duration
  ) AS total_durations;