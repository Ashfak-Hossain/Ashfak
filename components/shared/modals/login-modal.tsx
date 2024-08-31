'use client';

import { LoginForm } from '@/components/auth/login-form';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { closeLoginModal } from '@/redux/features/modals/modalsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state: RootState) => state.modals.loginModal.isOpen
  );

  const handleClose = () => {
    dispatch(closeLoginModal());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-auto border-none bg-transparent p-0">
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
