import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthorized");
  }
  return await ctx.storage.generateUploadUrl();
});

export const getFileUrl = mutation({
  args: { fileId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.fileId);
  },
});

export const createPost = mutation({
  args: {
    caption: v.string(),
    tags: v.string(),
    fileId: v.id("_storage"),
    location: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const fileUrl = await ctx.storage.getUrl(args.fileId);
    const tagsArray = args.tags.replace(/ /g, "").split(",");
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerk_Id", identity.subject))
      .first();
    if (!user) {
      throw new ConvexError("User not found");
    }
    const newPost = await ctx.db.insert("posts", {
      caption: args.caption,
      tags: tagsArray,
      imageUrl: fileUrl!,
      imageId: args.fileId,
      location: args.location,
      authorId: user?._id,
      authorName: user.name,
      authorImage: user.imageUrl!,
      saved: [],
      liked: [],
    });
    return newPost;
  },
});

export const getAllPosts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("posts").order("desc").collect();
  },
});

export const toggleSavePost = mutation({
  args: { postId: v.id("posts"), userId: v.id("users") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const post = await ctx.db
      .query("posts")
      .withIndex("by_id", (q) => q.eq("_id", args.postId))
      .first();

    if (!post) {
      throw new ConvexError("Post not found");
    }

    if (post.saved.includes(args.userId)) {
      await ctx.db.patch(post._id, {
        saved: post.saved.filter((id) => id !== args.userId),
      });
    } else {
      await ctx.db.patch(post._id, {
        saved: [...post.saved, args.userId],
      });
    }
  },
});

export const toggleLikePost = mutation({
  args: { postId: v.id("posts"), userId: v.id("users") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const post = await ctx.db
      .query("posts")
      .withIndex("by_id", (q) => q.eq("_id", args.postId))
      .first();

    if (!post) {
      throw new ConvexError("Post not found");
    }

    if (post.liked.includes(args.userId)) {
      await ctx.db.patch(post._id, {
        liked: post.liked.filter((id) => id !== args.userId),
      });
    } else {
      await ctx.db.patch(post._id, {
        liked: [...post.liked, args.userId],
      });
    }
  },
});

export const getUserSavedPosts = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerk_Id", identity.subject))
      .first();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const posts = await ctx.db.query("posts").collect();
    const savedPosts = posts.filter((post) => post.saved.includes(user._id));
    return savedPosts;
  },
});

export const getPostById = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_id", (q) => q.eq("_id", args.postId))
      .first();
  },
});

export const updatePost = mutation({
  args: {
    postId: v.id("posts"),
    caption: v.string(),
    tags: v.string(),
    imageId: v.optional(v.id("_storage")),
    location: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const post = await ctx.db
      .query("posts")
      .withIndex("by_id", (q) => q.eq("_id", args.postId))
      .first();

    if (!post) {
      throw new ConvexError("Post not found");
    }

    let fileUrl = null;
    let imageId = null;
    if (args.imageId) {
      fileUrl = await ctx.storage.getUrl(args.imageId);
    } else {
      fileUrl = post.imageUrl;
    }
    if (args.imageId) {
      imageId = args.imageId;
    } else {
      imageId = post.imageId;
    }
    const tagsArray = args.tags.replace(/ /g, "").split(",");
    await ctx.db.patch(post._id, {
      caption: args.caption,
      tags: tagsArray,
      imageId: imageId,
      imageUrl: fileUrl!,
      location: args.location,
    });
    return { message: "Post updated successfully" };
  },
});

export const deleteById = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.delete(args.storageId);
  },
});

export const deletePost = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerk_Id", identity.subject))
      .first();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const post = await ctx.db
      .query("posts")
      .withIndex("by_id", (q) => q.eq("_id", args.postId))
      .first();

    if (!post) {
      throw new ConvexError("Post not found");
    }

    if (post.authorId !== user._id) {
      throw new ConvexError("Unauthorized");
    }
    await ctx.storage.delete(post.imageId);
    await ctx.db.delete(post._id);
    return { message: "Post deleted successfully" };
  },
});

export const getPostsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db
      .query("posts")
      .withIndex("by_authorId", (q) => q.eq("authorId", args.userId))
      .collect();
  },
});

export const paginatePosts = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const userLikedPosts = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }
    const posts = await ctx.db.query("posts").collect();
    const likedPosts = posts.filter((post) => post.liked.includes(args.userId));
    return likedPosts;
  },
});
