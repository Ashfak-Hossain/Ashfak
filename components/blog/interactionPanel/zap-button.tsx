import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';

import { toggleZap } from '@/actions/blog/interaction.action';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { cn } from '@/lib/utils';
import { openLoginModal } from '@/redux/features/modals/modalsSlice';
import { toggleStoreZap } from '@/redux/features/zaps/zapsSlice';
import { useAppDispatch } from '@/redux/hooks';

interface ZapButtonProps {
  zaped: boolean;
  slug: string;
}

const ZapButton: FC<ZapButtonProps> = ({ zaped, slug }) => {
  const user = useCurrentUser();
  const dispatch = useAppDispatch();
  const [state, setState] = useState<boolean>(zaped);

  const debouncedToggleZap = useDebouncedCallback(async (slug: string) => {
    try {
      await toggleZap({ slug });
    } catch (error) {
      toast.error('Something went wrong');
      setState((prevState) => !prevState);
      dispatch(toggleStoreZap());
    }
  }, 500);

  const handleClick = async () => {
    if (!user) {
      dispatch(openLoginModal());
      return;
    }
    setState((prevState) => !prevState);
    dispatch(toggleStoreZap());

    debouncedToggleZap(slug);
  };

  return (
    <Button variant="icon" size="icon">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Zap
          size={30}
          strokeWidth={state ? 0 : 1.5}
          fill={state ? '#f43f5e' : 'none'}
          className={cn('cursor-pointer', !state ? 'hover:text-rose-500' : '')}
          onClick={handleClick}
        />
      </motion.div>
    </Button>
  );
};

export default ZapButton;
