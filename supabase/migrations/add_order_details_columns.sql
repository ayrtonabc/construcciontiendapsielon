/*
  # Add detailed columns to orders table

  1. Changes
    - Add `items` column (jsonb) to store ordered product details.
    - Add `payment_method` column (text).
    - Add `shipping_address` column (jsonb) to store address details.
    - Add `recipient_name` column (text).
  2. Security
    - Update RLS policies on `orders` table to allow reading the new columns for authenticated users.
    - Ensure insert/update policies handle these new columns if applicable elsewhere.
*/

-- Add new columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'items') THEN
    ALTER TABLE orders ADD COLUMN items jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'payment_method') THEN
    ALTER TABLE orders ADD COLUMN payment_method text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'shipping_address') THEN
    ALTER TABLE orders ADD COLUMN shipping_address jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'recipient_name') THEN
    ALTER TABLE orders ADD COLUMN recipient_name text;
  END IF;
END $$;

-- RLS Policies Update (Example: Ensure authenticated users can read new columns)
-- Drop existing read policy if it needs modification, or create if it doesn't exist
DROP POLICY IF EXISTS "Allow authenticated read access" ON orders;

-- Recreate/Create policy allowing reads on all columns including new ones
CREATE POLICY "Allow authenticated read access"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);

-- Note: Ensure INSERT/UPDATE/DELETE policies are appropriate if order creation/modification
-- is handled elsewhere in the application. For now, focusing on read access.
