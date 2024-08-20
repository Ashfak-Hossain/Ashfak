'use client';

import { LoginForm } from '@/components/auth/login-form';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useLoginModal } from '@/hooks/zustand/use-login';

const LoginModal = () => {
  const { isOpen, onClose } = useLoginModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-auto border-none bg-transparent p-0">
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
