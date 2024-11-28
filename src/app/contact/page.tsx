"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import image from "./../../../public/image/hero.jpg";
import { Loader2, Phone, Mail, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

async function useSubmitData(
  formData: ContactFormValues
): Promise<ContactFormValues> {
  try {
    const response = await axios.post("/api/contact", formData);
    if (response.status !== 200) {
      throw new Error("Error in submitting form request");
    }
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error submitting your request."
    );
  }
}

export default function ContactForm() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation<
    ContactFormValues,
    Error,
    ContactFormValues
  >({
    mutationFn: useSubmitData,
    onSuccess: (data) => {
      toast({
        description: `Thank you, ${data.name}. We will get back to you soon!`,
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    mutate(data);
  };

  return (
    <div className="mt-3 space-y-8">
      <div className="relative h-[30vh]">
        <Image
          src={image}
          alt="Contact Us"
          fill
          className="rounded-lg object-cover"
        />
        <h1 className="absolute left-[50%] top-[30%] -translate-x-[50%] text-center text-3xl font-bold text-white">
          Contact Us
        </h1>
      </div>

      <div className="mt-5 flex flex-col justify-between gap-10 md:flex-row">
        {/* Phone Card */}
        <Card className="flex min-w-[300px] flex-col items-center p-3 text-center">
          <Phone size={50} className="text-greenPrimary" />
          <p className="text-lg font-bold">Phone</p>
          <p className="text-sm">For any assistance, call us directly:</p>
          <a
            href="tel:+254722297429"
            className="text-sm font-medium text-secondary_orange hover:underline"
          >
            +254 703 371 240
          </a>
        </Card>

        {/* Email Card */}
        <Card className="flex min-w-[300px] flex-col items-center p-3 text-center">
          <Mail size={50} className="text-greenPrimary" />
          <p className="text-lg font-bold">Email</p>
          <p className="text-sm">Reach out via email for inquiries:</p>
          <a
            href="mailto:info@tumainifitness.co.ke"
            className="text-sm font-medium text-secondary_orange hover:underline"
          >
            info@tumainifitness.co.ke
          </a>
        </Card>

        {/* Location Card */}
        <Card className="flex min-w-[300px] flex-col items-center p-3 text-center">
          <MapPin size={50} className="text-greenPrimary" />
          <p className="text-lg font-bold">Visit Us</p>
          <p className="text-sm">Find us at our main office:</p>
          <p className="text-sm font-medium text-secondary_orange">
            Kastemil Business centre, kasarani
          </p>
        </Card>
      </div>

      <div className="flex flex-col gap-5 md:flex-row bg-muted p-5 rounded-lg">
        <div className="basis-1/2 space-y-3">
          <h1 className="font-bold text-secondary_orange">Get in Touch</h1>
          <h2 className="text-lg font-semibold md:text-3xl">
            Feel Free to Reach Out to Us
          </h2>
          <p className="text-sm md:text-base">
            For any inquiries or assistance, please feel free to reach out to
            us. We are here to help and are committed to providing you with the
            best possible support.
          </p>
        </div>
        <div className="basis-1/2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        {...field}
                        aria-label="Enter your full name"
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Email"
                        {...field}
                        aria-label="Enter your email address"
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="message"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your Message"
                        {...field}
                        aria-label="Enter your message"
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button type="submit" className="w-full">
                  {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div>
        <iframe
          className="w-full rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4882.655900125021!2d36.9008908482592!3d-1.2134983040112104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3fa5b7241e9d%3A0xd7f4237ab5bd50a8!2sKastemil%20Business%20Centre!5e0!3m2!1sen!2ske!4v1732720702779!5m2!1sen!2ske"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
