# Supabase Storage Setup for Blog Media

## Quick Setup Guide

Follow these steps to set up storage for your blog images and media.

### Step 1: Create Storage Bucket

1. **Go to your Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project

2. **Navigate to Storage**
   - Click on "Storage" in the left sidebar
   - Click "New bucket"

3. **Create the bucket**:
   - **Name**: `blog-media`
   - **Public bucket**: ✅ **YES** (Enable this so images are publicly accessible)
   - **File size limit**: 10 MB (or adjust as needed)
   - **Allowed MIME types**: Leave empty or set to `image/*`
   - Click "Create bucket"

### Step 2: Set Up Storage Policies

After creating the bucket, you need to set up Row Level Security (RLS) policies.

1. **Go to Storage Policies**:
   - In the Storage section, click on your `blog-media` bucket
   - Click on "Policies" tab
   - Click "New Policy"

2. **Create SELECT Policy (Public Read Access)**:
   ```sql
   -- Policy Name: Public Access
   -- Allowed operation: SELECT
   -- Target roles: public
   
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   TO public
   USING ( bucket_id = 'blog-media' );
   ```

3. **Create INSERT Policy (Authenticated Upload)**:
   ```sql
   -- Policy Name: Authenticated Upload
   -- Allowed operation: INSERT
   -- Target roles: authenticated
   
   CREATE POLICY "Authenticated Upload"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK ( bucket_id = 'blog-media' );
   ```

4. **Create UPDATE Policy (Authenticated Update)**:
   ```sql
   -- Policy Name: Authenticated Update
   -- Allowed operation: UPDATE
   -- Target roles: authenticated
   
   CREATE POLICY "Authenticated Update"
   ON storage.objects FOR UPDATE
   TO authenticated
   USING ( bucket_id = 'blog-media' );
   ```

5. **Create DELETE Policy (Authenticated Delete)**:
   ```sql
   -- Policy Name: Authenticated Delete
   -- Allowed operation: DELETE
   -- Target roles: authenticated
   
   CREATE POLICY "Authenticated Delete"
   ON storage.objects FOR DELETE
   TO authenticated
   USING ( bucket_id = 'blog-media' );
   ```

### Step 3: Alternative - Run SQL Directly

You can also run all policies at once using the SQL Editor:

1. **Go to SQL Editor** in Supabase Dashboard
2. **Run this SQL**:

```sql
-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (optional)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

-- Create new policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING ( bucket_id = 'blog-media' );

CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'blog-media' );

CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'blog-media' );

CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'blog-media' );
```

### Step 4: Verify Setup

1. **Test the upload**:
   - Go to your admin blog editor: `/admin/blog/new`
   - Try uploading an image using the image button in the rich text editor
   - If successful, you'll see the image appear in your content

2. **Check uploaded files**:
   - Go back to Supabase Storage → `blog-media` bucket
   - You should see files under `blog-images/` folder

3. **Verify public access**:
   - Copy the public URL of any uploaded image
   - Paste it in a new browser tab
   - The image should load publicly

## Troubleshooting

### Error: "Bucket not found"
- Make sure the bucket name is exactly `blog-media`
- Check that you're connected to the right Supabase project

### Error: "Permission denied"
- Verify RLS policies are set correctly
- Make sure you're authenticated when uploading
- Check that the bucket is marked as "Public"

### Error: "File too large"
- Check your bucket's file size limit
- Default is usually 50MB, but you can set it lower for images (10MB recommended)

### Images not displaying
- Ensure the bucket is set to "Public"
- Check that the "Public Access" policy exists
- Verify the image URL is correct

## File Organization

Files will be automatically organized as:
```
blog-media/
└── blog-images/
    ├── {random-id}-{timestamp}.jpg
    ├── {random-id}-{timestamp}.png
    └── ...
```

## Best Practices

1. **Image Optimization**: Compress images before uploading
2. **File Naming**: Files are automatically named with random IDs to avoid conflicts
3. **Security**: Only authenticated users can upload, but anyone can view
4. **Cleanup**: Periodically review and delete unused images

## Storage Limits

- **Free Tier**: 1 GB storage
- **Pro Tier**: 100 GB storage
- Monitor your usage in the Supabase Dashboard

## Next Steps

After setup:
1. ✅ Create a new blog post at `/admin/blog/new`
2. ✅ Test image upload functionality
3. ✅ Try the AI content generation
4. ✅ Publish your first blog post!

## Support

If you encounter any issues:
1. Check Supabase Dashboard → Storage → Policies
2. Verify environment variables are set correctly
3. Check browser console for error messages
4. Review Supabase logs in the Dashboard

