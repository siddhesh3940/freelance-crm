-- Check if tables exist and their structure
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Check existing data
SELECT COUNT(*) as user_count FROM users;
SELECT COUNT(*) as client_count FROM clients;
SELECT COUNT(*) as project_count FROM projects;
SELECT COUNT(*) as task_count FROM tasks;
SELECT COUNT(*) as invoice_count FROM invoices;