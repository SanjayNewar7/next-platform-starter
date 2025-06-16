
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters." }).max(50),
  // photoURL: z.string().url({ message: "Please enter a valid URL for your photo." }).optional().or(z.literal('')), // If we add photoURL update
});

type ProfileFormValues = z.infer<typeof formSchema>;

export default function ProfileForm() {
  const { user, updateUserProfile, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      // photoURL: user?.photoURL || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        displayName: user.displayName || "",
        // photoURL: user.photoURL || "",
      });
    }
  }, [user, form]);

  async function onSubmit(values: ProfileFormValues) {
    try {
      await updateUserProfile({ displayName: values.displayName });
      toast({
        title: "Profile Updated",
        description: "Your display name has been successfully updated.",
      });
    } catch (e: any) {
      toast({
        title: "Update Failed",
        description: e.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="photoURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/your-image.png" {...field} />
              </FormControl>
              <FormDescription>
                Enter a URL for your profile picture.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit" className="w-full" disabled={authLoading || form.formState.isSubmitting}>
          {authLoading || form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
        <p className="text-xs text-muted-foreground text-center pt-2">
            Profile picture updates via URL are not fully supported in this mock version. The avatar will reflect any `photoURL` set during Google sign-in.
        </p>
      </form>
    </Form>
  );
}
