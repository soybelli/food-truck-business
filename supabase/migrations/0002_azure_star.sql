/*
  # Data Migration
  
  This migration transfers existing data from the old database to the new one.
  
  1. Listings Data Migration
  2. Leads Data Migration
*/

-- Insert listings data
INSERT INTO listings (id, title, description, images, specifications, features, location, created_at, status) VALUES
('d290f1ee-6c54-4b01-90e6-d701748f0851', '2022 Custom Food Trailer', 'Fully equipped 20ft trailer with premium kitchen setup', ARRAY['https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'], 
'{"dimensions": "20'' x 8'' x 10''", "equipment": ["Commercial Range", "Deep Fryer", "Refrigeration"], "year": 2022, "condition": "Excellent"}'::jsonb,
ARRAY['Generator Included', 'LED Lighting', 'Service Window'],
'Los Angeles, CA',
'2024-02-20T10:00:00Z',
'available');

-- Insert leads data
INSERT INTO leads (id, created_at, full_name, phone_number, email, message, listing_id) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', '2024-02-20T12:00:00Z', 'John Smith', '+1234567890', 'john@example.com', 'Interested in the food trailer', 'd290f1ee-6c54-4b01-90e6-d701748f0851');