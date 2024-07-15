"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { ProfileValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Doc, Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import ProfileUploader from "./ProfileUploader";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { toast } from "sonner";

type EditProfileProps = {
  user: Doc<"users">;
  currentUserId: Id<"users">;
  setIsOpen: (value: boolean) => void;
};

const UpdateProfile = ({
  user,
  currentUserId,
  setIsOpen,
}: EditProfileProps) => {
  const updateUser = useMutation(api.users.updateUserData);
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  if (user._id !== currentUserId) {
    return (
      <div className="flex-center w-full h-full">
        <h1 className="h1-bold text-rose-500">
          You are not authorized to view this page
        </h1>
      </div>
    );
  }

  const handleUpdate = async (values: z.infer<typeof ProfileValidation>) => {
    let fileId = undefined;
    if (values.file.length > 0) {
      const file = values.file[0];
      const uploaded = await startUpload([file]);
      fileId = (uploaded[0] as { response: { storageId: Id<"_storage"> } })
        .response.storageId;
    }
    const updatedUser = await updateUser({
      name: values.name,
      bio: values.bio,
      imageId: fileId,
    });
    const { message } = updatedUser;
    if (updatedUser) {
      toast.message(message);
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-5 w-full mt-4 max-w-5xl"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={user.imageUrl!}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="shad-input rounded-xl"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="shad-input rounded-xl"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="shad-textarea custom-scrollbar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center justify-end">
              <Button
                type="button"
                className="shad-button_dark_4 rounded-xl"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap rounded-xl"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader className="w-8 h-8 animate-spin" />
                )}
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
