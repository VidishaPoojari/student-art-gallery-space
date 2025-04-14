
import React, { useState, useEffect } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { User, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { createComment, deleteComment, getCommentsByArtwork, Comment } from '@/services/commentService';
import { getUserById } from '@/services/userService';

interface CommentSectionProps {
  artworkId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ artworkId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser, userRole } = useAuth();
  
  // Fetch comments for the artwork
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const fetchedComments = await getCommentsByArtwork(artworkId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
        toast({
          title: "Error",
          description: "Failed to load comments",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchComments();
  }, [artworkId]);
  
  // Handle comment submission
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to comment",
        variant: "destructive",
      });
      return;
    }
    
    if (!newComment.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please write something before submitting",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get user's name
      const userProfile = await getUserById(currentUser.uid);
      const userName = userProfile?.name || 'Anonymous';
      
      // Create comment
      const commentId = await createComment(
        artworkId,
        currentUser.uid,
        userName,
        newComment.trim()
      );
      
      // Add new comment to the list (optimistic update)
      const newCommentObj: Comment = {
        id: commentId,
        artworkId,
        userId: currentUser.uid,
        userName,
        content: newComment.trim(),
        createdAt: new Date().toISOString()
      };
      
      setComments(prevComments => [newCommentObj, ...prevComments]);
      setNewComment('');
      
      toast({
        title: "Comment Posted",
        description: "Your comment has been added",
      });
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: "Error",
        description: "Failed to post your comment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle comment deletion
  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      
      // Remove comment from the list (optimistic update)
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      
      toast({
        title: "Comment Deleted",
        description: "The comment has been removed",
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast({
        title: "Error",
        description: "Failed to delete the comment",
        variant: "destructive",
      });
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Check if user can delete a comment (owner or comment author)
  const canDeleteComment = (commentUserId: string) => {
    return currentUser && (userRole === 'owner' || currentUser.uid === commentUserId);
  };
  
  return (
    <div className="neumorph p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-6">Comments</h2>
      
      {/* Comment form (only for logged-in users) */}
      {currentUser ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <Textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-4"
            required
          />
          <Button 
            type="submit" 
            className="bg-gallery-purple hover:bg-opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </form>
      ) : (
        <div className="bg-gallery-lightGray p-4 rounded-md mb-8">
          <p className="text-gallery-gray text-center">
            Please <a href="/login" className="text-gallery-purple hover:underline">log in</a> to leave a comment.
          </p>
        </div>
      )}
      
      {/* Comments list */}
      <div className="space-y-6">
        {isLoading ? (
          <p className="text-center text-gallery-gray">Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <User className="h-6 w-6" />
                  </Avatar>
                  
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-medium">{comment.userName}</h4>
                      <span className="text-xs text-gallery-gray">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gallery-gray mt-1">{comment.content}</p>
                  </div>
                </div>
                
                {canDeleteComment(comment.userId) && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gallery-gray">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
