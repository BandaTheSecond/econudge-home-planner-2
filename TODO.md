# TODO: Update Reports to Receive Data from Planner and Present Summary in Bar Chart

## Steps to Complete

- [x] Add new backend endpoint `/api/reports/planner-summary` in `report_routes.py` to aggregate planner data: counts of tasks by status (pending, in_progress, completed).
- [x] Update `Reports.jsx` to fetch from the new endpoint, replace the pie chart with a bar chart (using BarChart from recharts) showing task counts by status.
- [x] Update KPIs in `Reports.jsx` to reflect planner metrics (e.g., Total Tasks, Completed Tasks, In Progress, Pending).
- [x] Test the updated reports page to ensure data loads and bar chart displays correctly.
- [x] Verify backend endpoint returns expected data.
