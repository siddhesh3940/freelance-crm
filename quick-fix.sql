-- Quick fix - add user first, then clients
INSERT INTO users (id, email, name, "createdAt", "updatedAt") 
VALUES ('temp-user-id', 'demo@freelancecrm.com', 'Demo User', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Add just 2 clients for testing
INSERT INTO clients (id, name, email, phone, company, "userId", "createdAt", "updatedAt") VALUES
('clnt1', 'Acme Corporation', 'contact@acme.com', '+1-555-0123', 'Acme Corp', 'temp-user-id', NOW(), NOW()),
('clnt2', 'Tech Startup Inc', 'hello@techstartup.io', '+1-555-0456', 'Tech Startup Inc', 'temp-user-id', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;