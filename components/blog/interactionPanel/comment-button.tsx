import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

import { Button } from '@/components/ui/button';

const CommentButton = () => {
  const handleClick = () => {
    const commentSection = document.getElementById('comments');
    commentSection?.scrollIntoView({ behavior: 'smooth' });
    const textArea = document.querySelector('textarea');
    textArea?.focus();
  };

  return (
    <Button variant="icon" size="icon" onClick={handleClick}>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <MessageSquare
          size={30}
          strokeWidth={1.5}
          className="cursor-pointer hover:scale-110 hover:text-yellow-600 hover:transition"
        />
      </motion.div>
    </Button>
  );
};

export default CommentButton;
