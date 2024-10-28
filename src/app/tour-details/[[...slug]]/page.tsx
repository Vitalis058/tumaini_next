"use client";
import { ChevronLeft, Loader2, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TourDetailsCard from "@/components/tourDetails/TourDetailsCard";
import { useGetTourDetails } from "@/api/toursApi";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { use, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

type Data = {
  name: string;
  email: string;
  message: string;
};

type PageProps = Promise<{
  slug: string;
}>;

const TourDetailsPage = (props: { params: PageProps }) => {
  const { toast } = useToast();

  const { slug } = use(props.params);
  console.log(slug);

  const { isLoading, tourDetails } = useGetTourDetails(slug);
  const { register, handleSubmit, reset } = useForm<Data>();
  const [loading, setIsLoading] = useState<boolean>();

  useEffect(() => emailjs.init("oyLdjkq5hU_uoQpZK"), []);

  //function to submit the form data
  const onSubmit: SubmitHandler<Data> = async (data: Data) => {
    const serviceId = "service_v8bttgq";
    const templateId = "template_yq15iuo";
    const newData = {
      ...data,
      subject: "tour inquiry",
    };

    if (
      newData.message.length < 10 ||
      newData.name.length < 3 ||
      newData.email.length < 9
    ) {
      return toast({
        description: "All fields are required",
      });
    }

    try {
      setIsLoading(true);
      await emailjs.send(serviceId, templateId, newData);
      toast({
        description: "Request successfully sent",
      });
      reset({
        email: "",
        name: "",
        message: "",
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
      console.log(error);
    }
  };
  return (
    <section>
      <div className="mx-auto max-w-full space-y-6 px-3 md:max-w-[95%] lg:max-w-[1140px]">
        <div>
          <Link href={"/tours"} className="flex items-center p-3 font-bold">
            <ChevronLeft />
            <h1>All Events</h1>
          </Link>
          <Separator className="w-full" />
          {isLoading ? (
            <span className="my-20 flex items-center justify-center text-greenPrimary">
              <Loader2 size={60} className="mr-2 h-7 animate-spin" />
            </span>
          ) : Object.keys(tourDetails).length > 0 ? (
            <TourDetailsCard tour={tourDetails} />
          ) : (
            <div className="flex h-[30vh] items-center justify-center">
              <p className="text-xl font-bold capitalize">No tour found</p>
            </div>
          )}
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row">
          <Button className="bg-[#09C308] md:w-[200px]">
            <a
              className="flex w-full items-center justify-center gap-3"
              href={`https://wa.me/+254703371240?text=Hello i would like to know more about the ${tourDetails?.name} hike`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-xl text-white" />
              <p>Book via whatsApp</p>
            </a>
          </Button>

          <Dialog>
            <DialogTrigger className="flex w-full max-w-full items-center justify-center gap-2 rounded-lg border-[2px] py-1 text-center font-semibold transition-all duration-200 ease-in-out hover:bg-gray-200 md:w-[250px]">
              <Mail />
              Book via Form
            </DialogTrigger>
            <DialogDescription></DialogDescription>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book Tour</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    placeholder="Kevin"
                    {...register("name", {
                      minLength: 1,
                    })}
                  />
                </div>
                <div className="">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email@gmail.com"
                    className="col-span-3"
                    {...register("email", {
                      minLength: 1,
                    })}
                  />
                </div>
                <div className="gap-4">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="inquiry"
                    {...register("message", { maxLength: 200 })}
                  />
                </div>
                <Button variant={"outline"} type="submit" disabled={loading}>
                  {loading ? "submitting" : "submit"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default TourDetailsPage;
