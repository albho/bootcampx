SELECT assignments.id,
  assignments.name,
  assignments.day,
  assignments.chapter,
  COUNT(assistance_requests.*) AS total_requests
FROM assignments
  INNER JOIN assistance_requests ON assignments.id = assistance_requests.assignment_id
GROUP BY assignments.id
ORDER BY total_requests DESC;