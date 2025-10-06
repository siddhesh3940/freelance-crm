import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST() {
  // Create actual sample data in database
  try {
    // Create user
    await db.user.upsert({
      where: { id: 'temp-user-id' },
      update: {},
      create: {
        id: 'temp-user-id',
        email: 'demo@freelancecrm.com',
        name: 'Demo User'
      }
    })

    // Create clients
    const client1 = await db.client.upsert({
      where: { id: 'clnt1' },
      update: {},
      create: {
        id: 'clnt1',
        name: 'Acme Corporation',
        email: 'contact@acme.com',
        phone: '+1-555-0123',
        company: 'Acme Corp',
        address: '123 Business St, NY 10001',
        notes: 'Large enterprise client - Fortune 500 company',
        userId: 'temp-user-id'
      }
    })

    const client2 = await db.client.upsert({
      where: { id: 'clnt2' },
      update: {},
      create: {
        id: 'clnt2',
        name: 'Tech Startup Inc',
        email: 'hello@techstartup.io',
        phone: '+1-555-0456',
        company: 'Tech Startup Inc',
        address: '456 Innovation Ave, SF 94105',
        notes: 'Fast-growing startup - Series A funded',
        userId: 'temp-user-id'
      }
    })

    const client3 = await db.client.upsert({
      where: { id: 'clnt3' },
      update: {},
      create: {
        id: 'clnt3',
        name: 'Local Restaurant',
        email: 'owner@localrestaurant.com',
        phone: '+1-555-0789',
        company: 'Bella Vista Restaurant',
        address: '789 Main St, Chicago 60601',
        notes: 'Small business - family owned since 1995',
        userId: 'temp-user-id'
      }
    })

    const client4 = await db.client.upsert({
      where: { id: 'clnt4' },
      update: {},
      create: {
        id: 'clnt4',
        name: 'Global Consulting LLC',
        email: 'projects@globalconsulting.com',
        phone: '+1-555-1234',
        company: 'Global Consulting LLC',
        address: '999 Corporate Blvd, Dallas 75201',
        notes: 'International consulting firm - multiple ongoing projects',
        userId: 'temp-user-id'
      }
    })

    const client5 = await db.client.upsert({
      where: { id: 'clnt5' },
      update: {},
      create: {
        id: 'clnt5',
        name: 'E-commerce Solutions',
        email: 'dev@ecommercesolutions.net',
        phone: '+1-555-5678',
        company: 'E-commerce Solutions Inc',
        address: '321 Digital Way, Austin 78701',
        notes: 'Online retail platform - high volume transactions',
        userId: 'temp-user-id'
      }
    })

    // Additional 10 clients
    const client6 = await db.client.upsert({
      where: { id: 'clnt6' },
      update: {},
      create: {
        id: 'clnt6',
        name: 'HealthTech Innovations',
        email: 'contact@healthtech.com',
        phone: '+1-555-9012',
        company: 'HealthTech Innovations LLC',
        address: '555 Medical Center Dr, Boston 02101',
        notes: 'Healthcare technology startup - HIPAA compliant solutions',
        userId: 'temp-user-id'
      }
    })

    const client7 = await db.client.upsert({
      where: { id: 'clnt7' },
      update: {},
      create: {
        id: 'clnt7',
        name: 'Green Energy Corp',
        email: 'projects@greenenergy.org',
        phone: '+1-555-3456',
        company: 'Green Energy Corporation',
        address: '777 Renewable St, Portland 97201',
        notes: 'Sustainable energy solutions - solar and wind projects',
        userId: 'temp-user-id'
      }
    })

    const client8 = await db.client.upsert({
      where: { id: 'clnt8' },
      update: {},
      create: {
        id: 'clnt8',
        name: 'Financial Services Plus',
        email: 'it@finservices.com',
        phone: '+1-555-7890',
        company: 'Financial Services Plus Inc',
        address: '888 Wall Street, New York 10005',
        notes: 'Investment firm - requires high security and compliance',
        userId: 'temp-user-id'
      }
    })

    const client9 = await db.client.upsert({
      where: { id: 'clnt9' },
      update: {},
      create: {
        id: 'clnt9',
        name: 'Creative Design Studio',
        email: 'hello@creativedesign.co',
        phone: '+1-555-2468',
        company: 'Creative Design Studio',
        address: '999 Art District, Los Angeles 90028',
        notes: 'Digital marketing agency - creative campaigns and branding',
        userId: 'temp-user-id'
      }
    })

    const client10 = await db.client.upsert({
      where: { id: 'clnt10' },
      update: {},
      create: {
        id: 'clnt10',
        name: 'Manufacturing Solutions',
        email: 'tech@manufacturing.com',
        phone: '+1-555-1357',
        company: 'Manufacturing Solutions Ltd',
        address: '111 Industrial Blvd, Detroit 48201',
        notes: 'Industrial automation - IoT and smart factory solutions',
        userId: 'temp-user-id'
      }
    })

    const client11 = await db.client.upsert({
      where: { id: 'clnt11' },
      update: {},
      create: {
        id: 'clnt11',
        name: 'Education Platform',
        email: 'dev@eduplatform.edu',
        phone: '+1-555-8024',
        company: 'Education Platform Inc',
        address: '222 Learning Ave, Chicago 60601',
        notes: 'Online learning platform - K-12 and higher education',
        userId: 'temp-user-id'
      }
    })

    const client12 = await db.client.upsert({
      where: { id: 'clnt12' },
      update: {},
      create: {
        id: 'clnt12',
        name: 'Real Estate Pro',
        email: 'systems@realestatepro.com',
        phone: '+1-555-9753',
        company: 'Real Estate Pro LLC',
        address: '333 Property Lane, Miami 33101',
        notes: 'Real estate management - property listings and CRM',
        userId: 'temp-user-id'
      }
    })

    const client13 = await db.client.upsert({
      where: { id: 'clnt13' },
      update: {},
      create: {
        id: 'clnt13',
        name: 'Sports Analytics',
        email: 'data@sportsanalytics.com',
        phone: '+1-555-4680',
        company: 'Sports Analytics Corp',
        address: '444 Stadium Way, Denver 80202',
        notes: 'Sports data analysis - performance tracking and statistics',
        userId: 'temp-user-id'
      }
    })

    const client14 = await db.client.upsert({
      where: { id: 'clnt14' },
      update: {},
      create: {
        id: 'clnt14',
        name: 'Travel Booking Hub',
        email: 'tech@travelhub.com',
        phone: '+1-555-1593',
        company: 'Travel Booking Hub Inc',
        address: '555 Airport Rd, Las Vegas 89101',
        notes: 'Travel booking platform - flights, hotels, and packages',
        userId: 'temp-user-id'
      }
    })

    const client15 = await db.client.upsert({
      where: { id: 'clnt15' },
      update: {},
      create: {
        id: 'clnt15',
        name: 'Food Delivery Network',
        email: 'engineering@foodnetwork.com',
        phone: '+1-555-7531',
        company: 'Food Delivery Network LLC',
        address: '666 Delivery St, Seattle 98101',
        notes: 'Food delivery platform - restaurant partnerships and logistics',
        userId: 'temp-user-id'
      }
    })

    // Create projects
    const project1 = await db.project.upsert({
      where: { id: 'proj1' },
      update: {},
      create: {
        id: 'proj1',
        name: 'Website Redesign',
        description: 'Complete overhaul of company website',
        status: 'ACTIVE',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-03-15'),
        budget: 15000,
        hourlyRate: 75,
        userId: 'temp-user-id',
        clientId: 'clnt1'
      }
    })

    const project2 = await db.project.upsert({
      where: { id: 'proj2' },
      update: {},
      create: {
        id: 'proj2',
        name: 'Mobile App Development',
        description: 'iOS and Android app for customers',
        status: 'ACTIVE',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-06-01'),
        budget: 25000,
        hourlyRate: 85,
        userId: 'temp-user-id',
        clientId: 'clnt2'
      }
    })

    const project3 = await db.project.upsert({
      where: { id: 'proj3' },
      update: {},
      create: {
        id: 'proj3',
        name: 'SEO Optimization',
        description: 'Improve search rankings and online presence',
        status: 'COMPLETED',
        startDate: new Date('2023-12-01'),
        endDate: new Date('2024-01-31'),
        budget: 3000,
        hourlyRate: 60,
        userId: 'temp-user-id',
        clientId: 'clnt3'
      }
    })

    const project4 = await db.project.upsert({
      where: { id: 'proj4' },
      update: {},
      create: {
        id: 'proj4',
        name: 'Data Analytics Dashboard',
        description: 'Custom analytics and reporting dashboard',
        status: 'ACTIVE',
        startDate: new Date('2024-01-20'),
        endDate: new Date('2024-04-20'),
        budget: 35000,
        hourlyRate: 95,
        userId: 'temp-user-id',
        clientId: 'clnt4'
      }
    })

    const project5 = await db.project.upsert({
      where: { id: 'proj5' },
      update: {},
      create: {
        id: 'proj5',
        name: 'E-commerce Platform Upgrade',
        description: 'Modernize existing e-commerce platform',
        status: 'ON_HOLD',
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-07-15'),
        budget: 50000,
        hourlyRate: 110,
        userId: 'temp-user-id',
        clientId: 'clnt5'
      }
    })

    const project6 = await db.project.upsert({
      where: { id: 'proj6' },
      update: {},
      create: {
        id: 'proj6',
        name: 'Security Audit',
        description: 'Comprehensive security assessment and improvements',
        status: 'ACTIVE',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-01'),
        budget: 8000,
        hourlyRate: 120,
        userId: 'temp-user-id',
        clientId: 'clnt1'
      }
    })

    // Additional 10 projects
    const project7 = await db.project.upsert({
      where: { id: 'proj7' },
      update: {},
      create: {
        id: 'proj7',
        name: 'Healthcare Portal Development',
        description: 'Patient management system with HIPAA compliance',
        status: 'ACTIVE',
        startDate: new Date('2024-01-10'),
        endDate: new Date('2024-05-10'),
        budget: 45000,
        hourlyRate: 130,
        userId: 'temp-user-id',
        clientId: 'clnt6'
      }
    })

    const project8 = await db.project.upsert({
      where: { id: 'proj8' },
      update: {},
      create: {
        id: 'proj8',
        name: 'Solar Panel Monitoring System',
        description: 'IoT-based monitoring for solar energy installations',
        status: 'COMPLETED',
        startDate: new Date('2023-11-01'),
        endDate: new Date('2024-01-15'),
        budget: 28000,
        hourlyRate: 90,
        userId: 'temp-user-id',
        clientId: 'clnt7'
      }
    })

    const project9 = await db.project.upsert({
      where: { id: 'proj9' },
      update: {},
      create: {
        id: 'proj9',
        name: 'Trading Platform Upgrade',
        description: 'High-frequency trading system modernization',
        status: 'ACTIVE',
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-06-15'),
        budget: 75000,
        hourlyRate: 150,
        userId: 'temp-user-id',
        clientId: 'clnt8'
      }
    })

    const project10 = await db.project.upsert({
      where: { id: 'proj10' },
      update: {},
      create: {
        id: 'proj10',
        name: 'Brand Identity System',
        description: 'Complete brand redesign and digital asset creation',
        status: 'ON_HOLD',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-05-01'),
        budget: 18000,
        hourlyRate: 85,
        userId: 'temp-user-id',
        clientId: 'clnt9'
      }
    })

    const project11 = await db.project.upsert({
      where: { id: 'proj11' },
      update: {},
      create: {
        id: 'proj11',
        name: 'Factory Automation System',
        description: 'Smart manufacturing and quality control system',
        status: 'ACTIVE',
        startDate: new Date('2024-01-20'),
        endDate: new Date('2024-07-20'),
        budget: 95000,
        hourlyRate: 125,
        userId: 'temp-user-id',
        clientId: 'clnt10'
      }
    })

    const project12 = await db.project.upsert({
      where: { id: 'proj12' },
      update: {},
      create: {
        id: 'proj12',
        name: 'Learning Management System',
        description: 'Custom LMS with interactive content delivery',
        status: 'ACTIVE',
        startDate: new Date('2024-02-05'),
        endDate: new Date('2024-08-05'),
        budget: 52000,
        hourlyRate: 100,
        userId: 'temp-user-id',
        clientId: 'clnt11'
      }
    })

    const project13 = await db.project.upsert({
      where: { id: 'proj13' },
      update: {},
      create: {
        id: 'proj13',
        name: 'Property Management Portal',
        description: 'Real estate CRM and property listing platform',
        status: 'COMPLETED',
        startDate: new Date('2023-10-01'),
        endDate: new Date('2024-01-01'),
        budget: 32000,
        hourlyRate: 95,
        userId: 'temp-user-id',
        clientId: 'clnt12'
      }
    })

    const project14 = await db.project.upsert({
      where: { id: 'proj14' },
      update: {},
      create: {
        id: 'proj14',
        name: 'Sports Performance Analytics',
        description: 'Real-time athlete performance tracking system',
        status: 'ACTIVE',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-04-15'),
        budget: 38000,
        hourlyRate: 110,
        userId: 'temp-user-id',
        clientId: 'clnt13'
      }
    })

    const project15 = await db.project.upsert({
      where: { id: 'proj15' },
      update: {},
      create: {
        id: 'proj15',
        name: 'Travel Booking API',
        description: 'RESTful API for travel booking integrations',
        status: 'CANCELLED',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-01'),
        budget: 22000,
        hourlyRate: 105,
        userId: 'temp-user-id',
        clientId: 'clnt14'
      }
    })

    const project16 = await db.project.upsert({
      where: { id: 'proj16' },
      update: {},
      create: {
        id: 'proj16',
        name: 'Food Delivery Optimization',
        description: 'Route optimization and delivery tracking system',
        status: 'ACTIVE',
        startDate: new Date('2024-02-10'),
        endDate: new Date('2024-06-10'),
        budget: 42000,
        hourlyRate: 115,
        userId: 'temp-user-id',
        clientId: 'clnt15'
      }
    })

    // Create tasks
    await db.task.upsert({
      where: { id: 'task1' },
      update: {},
      create: {
        id: 'task1',
        title: 'Design Homepage Mockup',
        description: 'Create wireframes and visual design',
        status: 'COMPLETED',
        priority: 'HIGH',
        dueDate: new Date('2024-02-15'),
        estimatedHours: 8,
        actualHours: 6,
        userId: 'temp-user-id',
        projectId: 'proj1'
      }
    })

    await db.task.upsert({
      where: { id: 'task2' },
      update: {},
      create: {
        id: 'task2',
        title: 'Setup Development Environment',
        description: 'Configure servers and tools',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        dueDate: new Date('2024-02-20'),
        estimatedHours: 4,
        userId: 'temp-user-id',
        projectId: 'proj2'
      }
    })

    await db.task.upsert({
      where: { id: 'task3' },
      update: {},
      create: {
        id: 'task3',
        title: 'Content Strategy Meeting',
        description: 'Plan content structure',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: new Date('2024-02-25'),
        estimatedHours: 2,
        userId: 'temp-user-id',
        projectId: 'proj1'
      }
    })

    await db.task.upsert({
      where: { id: 'task4' },
      update: {},
      create: {
        id: 'task4',
        title: 'Client Presentation Prep',
        description: 'Prepare project slides and demo',
        status: 'TODO',
        priority: 'URGENT',
        dueDate: new Date('2024-02-10'),
        estimatedHours: 3,
        userId: 'temp-user-id'
      }
    })

    await db.task.upsert({
      where: { id: 'task5' },
      update: {},
      create: {
        id: 'task5',
        title: 'Database Schema Design',
        description: 'Design and implement new database schema',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        dueDate: new Date('2024-02-25'),
        estimatedHours: 12,
        actualHours: 8,
        userId: 'temp-user-id',
        projectId: 'proj4'
      }
    })

    await db.task.upsert({
      where: { id: 'task6' },
      update: {},
      create: {
        id: 'task6',
        title: 'Security Vulnerability Assessment',
        description: 'Conduct comprehensive security testing',
        status: 'TODO',
        priority: 'HIGH',
        dueDate: new Date('2024-02-20'),
        estimatedHours: 16,
        userId: 'temp-user-id',
        projectId: 'proj6'
      }
    })

    await db.task.upsert({
      where: { id: 'task7' },
      update: {},
      create: {
        id: 'task7',
        title: 'API Documentation',
        description: 'Create comprehensive API documentation',
        status: 'COMPLETED',
        priority: 'MEDIUM',
        dueDate: new Date('2024-01-30'),
        completedAt: new Date('2024-01-28'),
        estimatedHours: 6,
        actualHours: 5,
        userId: 'temp-user-id',
        projectId: 'proj2'
      }
    })

    await db.task.upsert({
      where: { id: 'task8' },
      update: {},
      create: {
        id: 'task8',
        title: 'Performance Optimization',
        description: 'Optimize application performance and loading times',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        dueDate: new Date('2024-03-05'),
        estimatedHours: 10,
        actualHours: 4,
        userId: 'temp-user-id',
        projectId: 'proj5'
      }
    })

    // Additional 15 tasks
    await db.task.upsert({
      where: { id: 'task9' },
      update: {},
      create: {
        id: 'task9',
        title: 'HIPAA Compliance Review',
        description: 'Ensure all healthcare data handling meets HIPAA requirements',
        status: 'COMPLETED',
        priority: 'HIGH',
        dueDate: new Date('2024-02-01'),
        completedAt: new Date('2024-01-30'),
        estimatedHours: 8,
        actualHours: 6,
        userId: 'temp-user-id',
        projectId: 'proj7'
      }
    })

    await db.task.upsert({
      where: { id: 'task10' },
      update: {},
      create: {
        id: 'task10',
        title: 'Solar Panel Data Integration',
        description: 'Integrate IoT sensors with monitoring dashboard',
        status: 'COMPLETED',
        priority: 'HIGH',
        dueDate: new Date('2024-01-10'),
        completedAt: new Date('2024-01-08'),
        estimatedHours: 12,
        actualHours: 14,
        userId: 'temp-user-id',
        projectId: 'proj8'
      }
    })

    await db.task.upsert({
      where: { id: 'task11' },
      update: {},
      create: {
        id: 'task11',
        title: 'High-Frequency Trading Algorithm',
        description: 'Develop and test new trading algorithms',
        status: 'IN_PROGRESS',
        priority: 'URGENT',
        dueDate: new Date('2024-03-15'),
        estimatedHours: 40,
        actualHours: 25,
        userId: 'temp-user-id',
        projectId: 'proj9'
      }
    })

    await db.task.upsert({
      where: { id: 'task12' },
      update: {},
      create: {
        id: 'task12',
        title: 'Logo Design Concepts',
        description: 'Create initial logo design concepts and variations',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: new Date('2024-03-20'),
        estimatedHours: 16,
        userId: 'temp-user-id',
        projectId: 'proj10'
      }
    })

    await db.task.upsert({
      where: { id: 'task13' },
      update: {},
      create: {
        id: 'task13',
        title: 'Quality Control System Setup',
        description: 'Configure automated quality control processes',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        dueDate: new Date('2024-03-10'),
        estimatedHours: 24,
        actualHours: 12,
        userId: 'temp-user-id',
        projectId: 'proj11'
      }
    })

    await db.task.upsert({
      where: { id: 'task14' },
      update: {},
      create: {
        id: 'task14',
        title: 'Interactive Content Module',
        description: 'Develop interactive learning content delivery system',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: new Date('2024-04-01'),
        estimatedHours: 20,
        userId: 'temp-user-id',
        projectId: 'proj12'
      }
    })

    await db.task.upsert({
      where: { id: 'task15' },
      update: {},
      create: {
        id: 'task15',
        title: 'Property Search Optimization',
        description: 'Optimize property search algorithms and filters',
        status: 'COMPLETED',
        priority: 'MEDIUM',
        dueDate: new Date('2023-12-15'),
        completedAt: new Date('2023-12-12'),
        estimatedHours: 15,
        actualHours: 18,
        userId: 'temp-user-id',
        projectId: 'proj13'
      }
    })

    await db.task.upsert({
      where: { id: 'task16' },
      update: {},
      create: {
        id: 'task16',
        title: 'Real-time Data Processing',
        description: 'Implement real-time sports data processing pipeline',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        dueDate: new Date('2024-02-28'),
        estimatedHours: 18,
        actualHours: 10,
        userId: 'temp-user-id',
        projectId: 'proj14'
      }
    })

    await db.task.upsert({
      where: { id: 'task17' },
      update: {},
      create: {
        id: 'task17',
        title: 'Route Optimization Algorithm',
        description: 'Develop efficient delivery route calculation system',
        status: 'TODO',
        priority: 'HIGH',
        dueDate: new Date('2024-03-25'),
        estimatedHours: 22,
        userId: 'temp-user-id',
        projectId: 'proj16'
      }
    })

    await db.task.upsert({
      where: { id: 'task18' },
      update: {},
      create: {
        id: 'task18',
        title: 'User Authentication System',
        description: 'Implement secure multi-factor authentication',
        status: 'COMPLETED',
        priority: 'HIGH',
        dueDate: new Date('2024-01-20'),
        completedAt: new Date('2024-01-18'),
        estimatedHours: 12,
        actualHours: 10,
        userId: 'temp-user-id',
        projectId: 'proj7'
      }
    })

    await db.task.upsert({
      where: { id: 'task19' },
      update: {},
      create: {
        id: 'task19',
        title: 'Mobile App Testing',
        description: 'Comprehensive testing across iOS and Android platforms',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: new Date('2024-04-15'),
        estimatedHours: 25,
        userId: 'temp-user-id',
        projectId: 'proj2'
      }
    })

    await db.task.upsert({
      where: { id: 'task20' },
      update: {},
      create: {
        id: 'task20',
        title: 'Data Migration Planning',
        description: 'Plan and execute legacy system data migration',
        status: 'IN_PROGRESS',
        priority: 'URGENT',
        dueDate: new Date('2024-02-25'),
        estimatedHours: 30,
        actualHours: 15,
        userId: 'temp-user-id',
        projectId: 'proj9'
      }
    })

    await db.task.upsert({
      where: { id: 'task21' },
      update: {},
      create: {
        id: 'task21',
        title: 'Performance Benchmarking',
        description: 'Establish performance benchmarks and monitoring',
        status: 'TODO',
        priority: 'LOW',
        dueDate: new Date('2024-05-01'),
        estimatedHours: 8,
        userId: 'temp-user-id',
        projectId: 'proj11'
      }
    })

    await db.task.upsert({
      where: { id: 'task22' },
      update: {},
      create: {
        id: 'task22',
        title: 'Content Management System',
        description: 'Build custom CMS for educational content',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        dueDate: new Date('2024-03-30'),
        estimatedHours: 35,
        actualHours: 20,
        userId: 'temp-user-id',
        projectId: 'proj12'
      }
    })

    await db.task.upsert({
      where: { id: 'task23' },
      update: {},
      create: {
        id: 'task23',
        title: 'Payment Gateway Integration',
        description: 'Integrate secure payment processing system',
        status: 'COMPLETED',
        priority: 'HIGH',
        dueDate: new Date('2024-01-25'),
        completedAt: new Date('2024-01-23'),
        estimatedHours: 14,
        actualHours: 16,
        userId: 'temp-user-id',
        projectId: 'proj16'
      }
    })

    // Create invoices
    const invoice1 = await db.invoice.upsert({
      where: { id: 'inv1' },
      update: {},
      create: {
        id: 'inv1',
        number: 'INV-001',
        status: 'PAID',
        issueDate: new Date('2024-01-01'),
        dueDate: new Date('2024-01-31'),
        subtotal: 4500,
        tax: 0,
        total: 4500,
        notes: 'Design phase completed',
        paidAt: new Date('2024-01-25'),
        userId: 'temp-user-id',
        clientId: 'clnt1',
        projectId: 'proj1'
      }
    })

    const invoice2 = await db.invoice.upsert({
      where: { id: 'inv2' },
      update: {},
      create: {
        id: 'inv2',
        number: 'INV-002',
        status: 'SENT',
        issueDate: new Date('2024-02-01'),
        dueDate: new Date('2024-02-28'),
        subtotal: 6800,
        tax: 0,
        total: 6800,
        notes: 'Development milestone',
        userId: 'temp-user-id',
        clientId: 'clnt2',
        projectId: 'proj2'
      }
    })

    const invoice3 = await db.invoice.upsert({
      where: { id: 'inv3' },
      update: {},
      create: {
        id: 'inv3',
        number: 'INV-003',
        status: 'OVERDUE',
        issueDate: new Date('2024-01-15'),
        dueDate: new Date('2024-02-15'),
        subtotal: 1800,
        tax: 0,
        total: 1800,
        notes: 'SEO optimization services',
        userId: 'temp-user-id',
        clientId: 'clnt3',
        projectId: 'proj3'
      }
    })

    const invoice4 = await db.invoice.upsert({
      where: { id: 'inv4' },
      update: {},
      create: {
        id: 'inv4',
        number: 'INV-004',
        status: 'DRAFT',
        issueDate: new Date('2024-02-10'),
        dueDate: new Date('2024-03-12'),
        subtotal: 9500,
        tax: 950,
        total: 10450,
        notes: 'Analytics dashboard development - Phase 1',
        userId: 'temp-user-id',
        clientId: 'clnt4',
        projectId: 'proj4'
      }
    })

    const invoice5 = await db.invoice.upsert({
      where: { id: 'inv5' },
      update: {},
      create: {
        id: 'inv5',
        number: 'INV-005',
        status: 'SENT',
        issueDate: new Date('2024-02-05'),
        dueDate: new Date('2024-03-07'),
        subtotal: 7200,
        tax: 720,
        total: 7920,
        notes: 'Security audit - Initial assessment',
        userId: 'temp-user-id',
        clientId: 'clnt1',
        projectId: 'proj6'
      }
    })

    // Create invoice items
    await db.invoiceItem.upsert({
      where: { id: 'item1' },
      update: {},
      create: {
        id: 'item1',
        description: 'UI/UX Design - Homepage',
        quantity: 60,
        rate: 75,
        amount: 4500,
        invoiceId: 'inv1'
      }
    })

    await db.invoiceItem.upsert({
      where: { id: 'item2' },
      update: {},
      create: {
        id: 'item2',
        description: 'Mobile App Development - Phase 1',
        quantity: 80,
        rate: 85,
        amount: 6800,
        invoiceId: 'inv2'
      }
    })

    await db.invoiceItem.upsert({
      where: { id: 'item3' },
      update: {},
      create: {
        id: 'item3',
        description: 'SEO Audit & Optimization',
        quantity: 30,
        rate: 60,
        amount: 1800,
        invoiceId: 'inv3'
      }
    })

    await db.invoiceItem.upsert({
      where: { id: 'item4' },
      update: {},
      create: {
        id: 'item4',
        description: 'Dashboard Development - Backend',
        quantity: 60,
        rate: 95,
        amount: 5700,
        invoiceId: 'inv4'
      }
    })

    await db.invoiceItem.upsert({
      where: { id: 'item5' },
      update: {},
      create: {
        id: 'item5',
        description: 'Dashboard Development - Frontend',
        quantity: 40,
        rate: 95,
        amount: 3800,
        invoiceId: 'inv4'
      }
    })

    await db.invoiceItem.upsert({
      where: { id: 'item6' },
      update: {},
      create: {
        id: 'item6',
        description: 'Security Assessment',
        quantity: 40,
        rate: 120,
        amount: 4800,
        invoiceId: 'inv5'
      }
    })

    await db.invoiceItem.upsert({
      where: { id: 'item7' },
      update: {},
      create: {
        id: 'item7',
        description: 'Vulnerability Testing',
        quantity: 20,
        rate: 120,
        amount: 2400,
        invoiceId: 'inv5'
      }
    })

    // Create communications
    await db.communication.upsert({
      where: { id: 'comm1' },
      update: {},
      create: {
        id: 'comm1',
        type: 'EMAIL',
        subject: 'Project Kickoff - Website Redesign',
        content: 'Thank you for choosing us for your website redesign. We are excited to get started!',
        clientId: 'clnt1'
      }
    })

    await db.communication.upsert({
      where: { id: 'comm2' },
      update: {},
      create: {
        id: 'comm2',
        type: 'MEETING',
        subject: 'Requirements Gathering',
        content: 'Discussed app features and technical requirements. Next steps: wireframes.',
        clientId: 'clnt2'
      }
    })

    await db.communication.upsert({
      where: { id: 'comm3' },
      update: {},
      create: {
        id: 'comm3',
        type: 'PHONE',
        subject: 'Project Status Update',
        content: 'Called to discuss current progress on analytics dashboard. Client is pleased with initial mockups.',
        clientId: 'clnt4'
      }
    })

    await db.communication.upsert({
      where: { id: 'comm4' },
      update: {},
      create: {
        id: 'comm4',
        type: 'EMAIL',
        subject: 'Security Audit Schedule',
        content: 'Sent detailed timeline for security audit. Scheduled initial assessment for next week.',
        clientId: 'clnt1'
      }
    })

    await db.communication.upsert({
      where: { id: 'comm5' },
      update: {},
      create: {
        id: 'comm5',
        type: 'MEETING',
        subject: 'E-commerce Platform Review',
        content: 'Reviewed current platform architecture. Identified key areas for improvement and modernization.',
        clientId: 'clnt5'
      }
    })

    return NextResponse.json({ 
      message: 'Extensive sample data created successfully! Refresh to see changes.',
      data: {
        clients: 15,
        projects: 16,
        tasks: 23,
        invoices: 5,
        items: 7,
        communications: 5
      }
    })

  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ 
      error: 'Failed to create sample data: ' + (error instanceof Error ? error.message : 'Unknown error') 
    }, { status: 500 })
  }
}