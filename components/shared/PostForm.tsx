"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PostValidation } from "@/lib/validations";
import { IPost } from "@/types";
import FileUploader from "./FileUploader";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Loader } from "lucide-react";

type PostFormProps = {
  post?: Doc<"posts">;
  action: "create" | "update";
};

export default function PostForm({ post, action }: PostFormProps) {
  const router = useRouter();
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const createPost = useMutation(api.posts.createPost);
  const updatePost = useMutation(api.posts.updatePost);

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post && action === "update") {
      let newFileId = undefined;
      if (values.file.length > 0) {
        const file = values.file[0];
        const uploaded = await startUpload([file]);
        const newImageId = (
          uploaded[0] as { response: { storageId: Id<"_storage"> } }
        ).response.storageId;
        if (!newImageId) {
          toast.error("Please try again later");
          return;
        }
        newFileId = newImageId;
      }
      const updatedPost = await updatePost({
        postId: post._id,
        caption: values.caption,
        tags: values.tags,
        imageId: newFileId,
        location: values.location,
      });
      if (!updatedPost) {
        toast.error("Error updating post, please try again later");
      } else {
        toast.success("Post updated successfully");
      }
      router.push("/");
    } else {
      const file = values.file[0];
      const uploaded = await startUpload([file]);
      const fileId = (
        uploaded[0] as { response: { storageId: Id<"_storage"> } }
      ).response.storageId;
      if (!fileId) {
        toast.error("Please try again later");
        return;
      }
      const newPost = await createPost({
        caption: values.caption,
        tags: values.tags,
        fileId,
        location: values.location,
      });
      if (!newPost) {
        toast.error("Error creating post, please try again later");
      } else {
        toast.success("Post created successfully");
      }
    }
    router.push("/");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma ",")
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input rounded-xl"
                  placeholder="Art, Design, Photography"
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
            size="default"
            className="shad-button_dark_4 rounded-xl"
            onClick={() => {
              if (action === "update") {
                router.push("/");
              } else {
                form.reset();
              }
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="default"
            className="shad-button_primary whitespace-nowrap rounded-xl"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader className="h-5 w-5 animate-spin" color="white" />
            ) : (
              <>{action.charAt(0).toUpperCase() + action.slice(1)} Post</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
