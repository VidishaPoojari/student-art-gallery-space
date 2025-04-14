
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
import { useAuth } from '@/contexts/AuthContext';
import { createArtwork } from '@/services/artworkService';
import { getUserById } from '@/services/userService';

// Define form schema
const artworkFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
});

// This ensures the type has required properties, not optional ones
type ArtworkFormValues = {
  title: string;
  description: string;
  category: string;
};

const ArtworkUpload: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    
    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Image Too Large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Only JPEG, PNG, and GIF formats are accepted",
        variant: "destructive",
      });
      return;
    }
    
    setImageFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Handle form submission
  const onSubmit = async (values: ArtworkFormValues) => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upload artwork",
        variant: "destructive",
      });
      return;
    }
    
    if (!imageFile) {
      toast({
        title: "Image Required",
        description: "Please select an image for your artwork",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get user's name
      const userProfile = await getUserById(currentUser.uid);
      const artistName = userProfile?.name || 'Anonymous Artist';
      
      // Create artwork in Firestore and upload image
      // Now values has the correct type with required properties
      const artworkId = await createArtwork(
        values,
        imageFile,
        currentUser.uid,
        artistName
      );
      
      toast({
        title: "Artwork Uploaded!",
        description: `Your artwork "${values.title}" has been successfully uploaded.`,
      });
      
      // Redirect to the artwork detail page
      navigate(`/artwork/${artworkId}`);
    } catch (error) {
      console.error('Error uploading artwork:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your artwork. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  !imageFile ? 'border-gray-300' : 'border-gallery-purple'
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
              {!imageFile && form.formState.isSubmitted && (
                <p className="text-sm font-medium text-destructive">Please upload an image</p>
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
              disabled={isSubmitting}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Uploading...' : 'Upload Artwork'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ArtworkUpload;
