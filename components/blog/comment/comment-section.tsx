import { AutosizeTextarea } from '@/components/ui/auto-resize-textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { HeartIcon, Reply, TrashIcon, Zap } from 'lucide-react';

const CommentSection = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold">Discussion (20)</h2>
      </div>

      <form className="mb-6">
        <div className="py-2 mb-4 rounded-lg rounded-t-lg">
          <AutosizeTextarea
            className="border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-300"
            placeholder="Write a comment..."
            minHeight={140}
            id="comment"
            required
          />
        </div>
        <Button type="submit" className="py-2.5 px-4 text-xs font-medium">
          Post comment
        </Button>
      </form>

      <div className="grid gap-8 p-6">
        {/* // All comment here */}

        {/* //! Comment 1 */}
        <div className="text-sm flex items-start gap-4">
          <div className="flex flex-col h-full items-center gap-2">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="@user1" />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <Separator orientation="vertical" className="shrink" />
          </div>

          <div className="flex flex-col">
            <div className="grid gap-1.5 py-2 mb-5">
              <div className="flex items-center gap-2">
                <div className="font-semibold">@user1</div>
                <div className="text-gray-500 text-xs dark:text-gray-400">
                  5 minutes ago
                </div>
              </div>
              <div>
                Amazing gallery! I love the vibrant colors and the composition
                of the images.
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Zap className="mr-1" size={18} />
                  Zap
                </Button>
                <Button variant="ghost" size="sm">
                  <Reply className="mr-1" size={18} />
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* //! Comment 2 */}
        <div className="text-sm flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@user2" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <div className="font-semibold">@user2</div>
              <div className="text-gray-500 text-xs dark:text-gray-400">
                10 minutes ago
              </div>
            </div>
            <div>The lighting in these photos is just perfect. Great job!</div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <HeartIcon className="w-4 h-4 mr-1" />
                Like
              </Button>
              <Button variant="ghost" size="sm">
                <TrashIcon className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
