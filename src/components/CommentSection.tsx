
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Comment {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  artworkId: string;
  createdAt: string;
}

interface CommentSectionProps {
  artworkId: string;
}

// Mock user data for demo
const currentUserDemo = {
  id: 'user123',
  name: 'Demo User',
  role: 'visitor',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
};

// Mock comments
const initialComments: Comment[] = [
  {
    id: 'comment1',
    text: 'I love the use of color in this piece! The composition is really well balanced.',
    userId: 'user456',
    userName: 'Art Enthusiast',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    artworkId: '1',
    createdAt: '2025-03-10T14:30:00Z'
  },
  {
    id: 'comment2',
    text: 'The technique used here reminds me of classical impressionism with a modern twist.',
    userId: 'user789',
    userName: 'Gallery Visitor',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    artworkId: '1',
    createdAt: '2025-03-12T09:15:00Z'
  }
];

const CommentSection: React.FC<CommentSectionProps> = ({ artworkId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // In a real app, these would come from authentication context
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');
  const isOwner = userRole === 'owner';
  
  // Load comments for this artwork
  useEffect(() => {
    // In a real app, this would fetch from Firebase/Supabase
    // Simulating API call with setTimeout
    const timer = setTimeout(() => {
      setComments(initialComments.filter(comment => comment.artworkId === artworkId));
    }, 500);
    
    return () => clearTimeout(timer);
  }, [artworkId]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };
  
  // Handle comment submission
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to comment on artworks",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (!newComment.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please enter a comment before submitting",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would submit to Firebase/Supabase
    // Simulating API call with setTimeout
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: `comment-${Date.now()}`,
        text: newComment,
        userId: currentUserDemo.id,
        userName: currentUserDemo.name,
        userAvatar: currentUserDemo.avatar,
        artworkId,
        createdAt: new Date().toISOString()
      };
      
      setComments(prev => [newCommentObj, ...prev]);
      setNewComment('');
      setIsSubmitting(false);
      
      toast({
        title: "Comment Posted",
        description: "Your comment has been added successfully",
      });
    }, 1000);
  };
  
  // Handle comment deletion
  const handleDeleteComment = (commentId: string) => {
    // In a real app, this would delete from Firebase/Supabase
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    
    toast({
      title: "Comment Deleted",
      description: "The comment has been removed",
    });
  };
  
  return (
    <div className="comment-section mt-8 pt-8 border-t">
      <h3 className="text-xl font-bold mb-6">Comments</h3>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <Textarea
          placeholder={isLoggedIn ? "Share your thoughts about this artwork..." : "Please log in to comment"}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-3 min-h-[100px]"
          disabled={!isLoggedIn || isSubmitting}
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-gallery-purple hover:bg-opacity-90"
            disabled={!isLoggedIn || isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
        
        {!isLoggedIn && (
          <p className="text-sm text-gallery-gray mt-2 text-center">
            <Button 
              variant="link" 
              className="p-0 h-auto text-gallery-purple" 
              onClick={() => navigate('/login')}
            >
              Log in
            </Button> to join the conversation
          </p>
        )}
      </form>
      
      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="p-4 rounded-lg bg-white border">
              <div className="flex items-start">
                <Avatar className="h-10 w-10 mr-3">
                  <img 
                    src={comment.userAvatar} 
                    alt={comment.userName}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';
                    }}
                  />
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-medium">{comment.userName}</h4>
                    
                    {/* Delete button (only shown to comment owner or admin) */}
                    {(isOwner || comment.userId === currentUserDemo.id) && (
                      <Button 
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gallery-gray hover:text-red-500"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-sm text-gallery-gray mb-2">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {formatDate(comment.createdAt)}
                  </p>
                  
                  <p className="text-gallery-darkGray">{comment.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg border">
          <p className="text-gallery-gray">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
