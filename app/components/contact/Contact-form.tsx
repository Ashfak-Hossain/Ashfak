'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { sendEmail } from '@/actions/sendEmail';
import SubmitButton from '@/app/components/ui/Submit-Button';
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

const ContactForm = () => {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
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
        className="mt-10 space-y-6 dark:text-black"
      >
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    className="w-full rounded-md p-2 text-sm transition-all dark:bg-white/80 dark:focus:bg-white/100"
                    type="text"
                    placeholder="Your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="w-full text-sm font-medium text-red-600/80" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    className="w-full rounded-md p-2 text-sm transition-all dark:bg-white/80 dark:focus:bg-white/100"
                    type="email"
                    placeholder="Your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm font-medium text-red-600/80" />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutosizeTextarea
                    className="h-52 w-full rounded-md px-4 text-sm transition-all dark:bg-white/80 dark:focus:bg-white/100"
                    placeholder="Your message"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm font-medium text-red-600/80" />
              </FormItem>
            )}
          />
        </div>
        <SubmitButton />
      </form>
    </Form>
  );
};

export default ContactForm;
