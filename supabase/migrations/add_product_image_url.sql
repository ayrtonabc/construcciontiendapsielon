/*
  # Add image_url to products table and set up RLS

  1. Changes
    - Add `image_url` column (text) to the `products` table.
  2. Security
    - Enable RLS on `products` table (if not already enabled).
    - Add policies for basic CRUD operations on `products` for authenticated users (adjust as needed for specific roles later).
    - Add policies for allowing authenticated users to manage objects in the 'product_images' bucket.
*/

-- 1. Add image_url column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE products ADD COLUMN image_url text;
  END IF;
END $$;

-- 2. Enable RLS (if not already enabled)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for products table
-- Allow authenticated users to view all products
CREATE POLICY "Allow authenticated read access"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (adjust role later if needed) to insert products
CREATE POLICY "Allow authenticated insert access"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true); -- Adjust check based on roles if necessary

-- Allow authenticated users (adjust role later if needed) to update products
CREATE POLICY "Allow authenticated update access"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true) -- Adjust using based on roles if necessary
  WITH CHECK (true);

-- Allow authenticated users (adjust role later if needed) to delete products
CREATE POLICY "Allow authenticated delete access"
  ON products
  FOR DELETE
  TO authenticated
  USING (true); -- Adjust using based on roles if necessary

-- 4. Storage Policies (Assuming a bucket named 'product_images')
--    CRITICAL: The user needs to manually create the 'product_images' bucket in Supabase Storage.
--    These policies allow authenticated users to manage images within that bucket.

-- Policy to view images
CREATE POLICY "Allow authenticated read access on product images"
  ON storage.objects FOR SELECT
  TO authenticated
  USING ( bucket_id = 'product_images' );

-- Policy to upload images
CREATE POLICY "Allow authenticated insert access on product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK ( bucket_id = 'product_images' );

-- Policy to update images (e.g., replace)
CREATE POLICY "Allow authenticated update access on product images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING ( bucket_id = 'product_images' );

-- Policy to delete images
CREATE POLICY "Allow authenticated delete access on product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING ( bucket_id = 'product_images' );
