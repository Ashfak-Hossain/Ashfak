'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { sendEmail } from '@/actions/sendEmail';
import { AutosizeTextarea } from '@/components/ui/auto-resize-textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { contactFormSchema } from '@/schema/contact-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';

import SubmitButton from './Submit-Button';

const ContactForm = () => {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    const response = await sendEmail(values);

    if ('error' in response) {
      toast.error("Couldn't send email");
    } else {
      toast.success(response.success);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 space-y-8 dark:text-black"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="h-14 rounded-lg px-4 text-base transition-all dark:bg-white/80 dark:focus:bg-white/100"
                  type="email"
                  placeholder="Your email"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-base font-medium text-red-600/80" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutosizeTextarea
                  className="h-52 rounded-lg px-4 text-base transition-all dark:bg-white/80 dark:focus:bg-white/100"
                  placeholder="Your message"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-base font-medium text-red-600/80" />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
};

export default ContactForm;
