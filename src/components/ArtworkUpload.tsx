
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, ImagePlus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Define form schema
const artworkFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  image: z.instanceof(File).refine(
    (file) => file.size <= 5 * 1024 * 1024, // 5MB limit
    'Image must be less than 5MB'
  ).refine(
    (file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
    'Only JPEG, PNG, and GIF formats are accepted'
  ),
});

type ArtworkFormValues = z.infer<typeof artworkFormSchema>;

const ArtworkUpload: React.FC = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Define form
  const form = useForm<ArtworkFormValues>({
    resolver: zodResolver(artworkFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
    },
  });
  
  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Set file in form
    form.setValue('image', file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Handle form submission
  const onSubmit = (values: ArtworkFormValues) => {
    // In a real app, this would upload to Firebase/Supabase
    console.log('Artwork to upload:', values);
    
    // Mock successful upload
    toast({
      title: "Artwork Uploaded!",
      description: `Your artwork "${values.title}" has been successfully uploaded.`,
    });
    
    // Redirect to gallery
    navigate('/gallery');
  };
  
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gallery-darkGray">Upload Your Artwork</CardTitle>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <FormLabel>Artwork Image</FormLabel>
              <div 
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
                  form.formState.errors.image ? 'border-red-500' : 'border-gray-300'
                }`}
                onClick={() => document.getElementById('artwork-upload')?.click()}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Artwork preview" 
                      className="max-h-64 mx-auto rounded-md" 
                    />
                    <p className="mt-2 text-sm text-gallery-gray">Click to change image</p>
                  </div>
                ) : (
                  <div className="py-8">
                    <ImagePlus className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gallery-gray">Click to upload image (JPEG, PNG, GIF)</p>
                    <p className="mt-1 text-xs text-gallery-gray">Max size: 5MB</p>
                  </div>
                )}
                <Input 
                  id="artwork-upload"
                  type="file" 
                  accept="image/jpeg,image/png,image/gif"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              {form.formState.errors.image && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.image.message}</p>
              )}
            </div>
            
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter artwork title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your artwork..." 
                      className="resize-none min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Painting">Painting</SelectItem>
                      <SelectItem value="Digital Art">Digital Art</SelectItem>
                      <SelectItem value="Photography">Photography</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-gallery-purple hover:bg-opacity-90"
              disabled={form.formState.isSubmitting}
            >
              <Upload className="mr-2 h-4 w-4" />
              {form.formState.isSubmitting ? 'Uploading...' : 'Upload Artwork'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ArtworkUpload;
