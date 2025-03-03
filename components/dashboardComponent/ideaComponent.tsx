"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { redirect } from "next/navigation";
import axios from "axios";
import { chatSchema } from "@/schemas/chatSchema";
import { Textarea } from "../ui/textarea";
import { Lightbulb, Loader } from "lucide-react";
import ViewIdeaComponent from "./viewIdeaComponent";

const IdeaGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false)
  const [response, setResponse] = useState({})

  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      theme: "",
      title: "",
    },
  });


  async function onSubmit(values: z.infer<typeof chatSchema>) {
    console.log("Form values:", values);
    if (!values.title || !values.theme) {
      console.error("Invalid payload:", values);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/chat", values);
      console.log("API Response:", response);

      if (response.status === 200 && response.data) {
        setResponse(response.data);
        setSuccess(true);
        console.log("Processed Response:", response.data);
      } else {
        console.error("Invalid API response format:", response);
      }
    } catch (error) {
      console.error("Error while generating idea:", error);
      return redirect("/login")
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <div className="font-poppins w-full max-w-[500px] space-y-6 bg-neutral-900 p-6 md:p-8 shadow-black shadow-2xl rounded-lg border-t-2 border-neutral-700 border mt-4 mb-4">
        <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 bg-clip-text text-transparent text-center">
          Generate a new idea
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Title of Idea</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lightbulb width={20} height={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                      <Input
                        placeholder="Rakshak"
                        {...field}
                        className="border shadow-neutral-800 shadow-sm border-neutral-800 bg-neutral-950 pl-10 text-neutral-200"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Give the correct title as per theme.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Theme of Hackathon</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Defence in blockchain solving a major issue."
                      {...field}
                      className="border shadow-neutral-800 shadow-sm border-neutral-800 bg-neutral-950 pl-10 text-neutral-100"
                    />
                  </FormControl>
                  <FormDescription>Give the correct theme as per the title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-800 hover:scale-105 transition-all duration-700 ease-in-out text-neutral-200 font-bold shadow-neutral-900 border-none outline-none w-full flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" /> Generating...
                </>
              ) : (
                "Generate Asli Idea ✨"
              )}

            </Button>
            {success && response?.message && (
              <ViewIdeaComponent
                title={response.message.title || "Unknown"}
                theme={response.message.theme || "Unknown"}
                id={response.message.id || "N/A"}
              />
            )}

          </form>
        </Form>
      </div>
    </div>
  );
};

export default IdeaGenerator;
