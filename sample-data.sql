-- Sample Data for Freelance CRM
-- Run these commands in your Supabase SQL Editor

-- 1. Insert User
INSERT INTO users (id, email, name, "createdAt", "updatedAt") 
VALUES ('temp-user-id', 'demo@freelancecrm.com', 'Demo User', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Clients
INSERT INTO clients (id, name, email, phone, company, address, notes, status, "userId", "createdAt", "updatedAt") VALUES
('client-1', 'Acme Corporation', 'contact@acme.com', '+1-555-0123', 'Acme Corp', '123 Business St, NY 10001', 'Large enterprise client', 'ACTIVE', 'temp-user-id', NOW(), NOW()),
('client-2', 'Tech Startup Inc', 'hello@techstartup.io', '+1-555-0456', 'Tech Startup Inc', '456 Innovation Ave, SF 94105', 'Fast-growing startup', 'ACTIVE', 'temp-user-id', NOW(), NOW()),
('client-3', 'Local Restaurant', 'owner@localrestaurant.com', '+1-555-0789', 'Bella Vista Restaurant', '789 Main St, Chicago 60601', 'Small business', 'ACTIVE', 'temp-user-id', NOW(), NOW());

-- 3. Insert Projects
INSERT INTO projects (id, name, description, status, "startDate", "endDate", budget, "hourlyRate", "userId", "clientId", "createdAt", "updatedAt") VALUES
('project-1', 'Website Redesign', 'Complete overhaul of company website', 'ACTIVE', '2024-01-15', '2024-03-15', 15000, 75, 'temp-user-id', 'client-1', NOW(), NOW()),
('project-2', 'Mobile App Development', 'iOS and Android app for customers', 'ACTIVE', '2024-02-01', '2024-06-01', 25000, 85, 'temp-user-id', 'client-2', NOW(), NOW()),
('project-3', 'SEO Optimization', 'Improve search rankings', 'COMPLETED', '2023-12-01', '2024-01-31', 3000, 60, 'temp-user-id', 'client-3', NOW(), NOW());

-- 4. Insert Tasks
INSERT INTO tasks (id, title, description, status, priority, "dueDate", "estimatedHours", "actualHours", "userId", "projectId", "createdAt", "updatedAt") VALUES
('task-1', 'Design Homepage Mockup', 'Create wireframes and visual design', 'COMPLETED', 'HIGH', '2024-02-15', 8, 6, 'temp-user-id', 'project-1', NOW(), NOW()),
('task-2', 'Setup Development Environment', 'Configure servers and tools', 'IN_PROGRESS', 'MEDIUM', '2024-02-20', 4, NULL, 'temp-user-id', 'project-2', NOW(), NOW()),
('task-3', 'Content Strategy Meeting', 'Plan content structure', 'TODO', 'MEDIUM', '2024-02-25', 2, NULL, 'temp-user-id', 'project-1', NOW(), NOW()),
('task-4', 'Client Presentation Prep', 'Prepare project slides', 'TODO', 'URGENT', '2024-02-10', 3, NULL, 'temp-user-id', NULL, NOW(), NOW());

-- 5. Insert Invoices
INSERT INTO invoices (id, number, status, "issueDate", "dueDate", subtotal, tax, total, notes, "paidAt", "userId", "clientId", "projectId", "createdAt", "updatedAt") VALUES
('invoice-1', 'INV-001', 'PAID', '2024-01-01', '2024-01-31', 4500, 0, 4500, 'Design phase completed', '2024-01-25', 'temp-user-id', 'client-1', 'project-1', NOW(), NOW()),
('invoice-2', 'INV-002', 'SENT', '2024-02-01', '2024-02-28', 6800, 0, 6800, 'Development milestone', NULL, 'temp-user-id', 'client-2', 'project-2', NOW(), NOW()),
('invoice-3', 'INV-003', 'OVERDUE', '2024-01-15', '2024-02-15', 1800, 0, 1800, 'SEO optimization', NULL, 'temp-user-id', 'client-3', 'project-3', NOW(), NOW());

-- 6. Insert Invoice Items
INSERT INTO invoice_items (id, description, quantity, rate, amount, "invoiceId") VALUES
('item-1', 'UI/UX Design - Homepage', 60, 75, 4500, 'invoice-1'),
('item-2', 'Mobile App Development - Phase 1', 80, 85, 6800, 'invoice-2'),
('item-3', 'SEO Audit & Optimization', 30, 60, 1800, 'invoice-3');

-- 7. Insert Communications
INSERT INTO communications (id, type, subject, content, "sentAt", "clientId", "createdAt") VALUES
('comm-1', 'EMAIL', 'Project Kickoff - Website Redesign', 'Thank you for choosing us for your website redesign. We are excited to get started!', NOW(), 'client-1', NOW()),
('comm-2', 'MEETING', 'Requirements Gathering', 'Discussed app features and technical requirements. Next steps: wireframes.', NOW(), 'client-2', NOW()),
('comm-3', 'PHONE', 'SEO Progress Update', 'Called to discuss current rankings improvement.', NOW(), 'client-3', NOW());

-- 8. Insert Notes
INSERT INTO notes (id, title, content, tags, "userId", "createdAt", "updatedAt") VALUES
('note-1', 'Client Preferences - Acme Corp', 'Prefers blue color scheme, modern minimalist design. CEO likes clean layouts.', ARRAY['design', 'preferences'], 'temp-user-id', NOW(), NOW()),
('note-2', 'Tech Stack Decision', 'Decided on React Native for mobile app. Client approved after demo.', ARRAY['development', 'tech-stack'], 'temp-user-id', NOW(), NOW());