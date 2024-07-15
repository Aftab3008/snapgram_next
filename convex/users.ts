import { internalMutation, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createUser = internalMutation({
  args: {
    username: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.optional(v.string()),
    clerk_Id: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      username: args.username,
      email: args.email,
      name: args.name,
      imageUrl: args.imageUrl,
      clerk_Id: args.clerk_Id,
      bio: "",
      followers: [],
      following: [],
    });
  },
});

export const updateUser = internalMutation({
  args: {
    username: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.optional(v.string()),
    clerk_Id: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerk_Id", args.clerk_Id))
      .first();
    if (!user) {
      throw new ConvexError("User does not exist");
    }
    await ctx.db.patch(user._id, {
      username: args.username,
      email: args.email,
      name: args.name,
      imageUrl: args.imageUrl,
      clerk_Id: args.clerk_Id,
    });
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerk_Id", identity.subject))
      .first();
    if (!user) {
      throw new ConvexError("User does not exist");
    }
    return user;
  },
});

export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("User not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerk_Id", identity.subject))
      .first();
    if (!user) {
      throw new ConvexError("User does not exist");
    }
    return await ctx.db
      .query("users")
      .filter((q) => q.neq(q.field("_id"), user._id))
      .collect();
  },
});

export const getUserById = query({
  args: {
    profileId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("User not authenticated");
    }
    return await ctx.db
      .query("users")
      .withIndex("by_id", (q) => q.eq("_id", args.profileId))
      .first();
  },
});

export const toggleFollow = mutation({
  args: {
    followId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("User not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerk_Id", identity.subject))
      .first();

    if (!user) {
      throw new ConvexError("User does not exist");
    }

    const followUser = await ctx.db
      .query("users")
      .withIndex("by_id", (q) => q.eq("_id", args.followId))
      .first();

    if (!followUser) {
      throw new ConvexError("User does not exist");
    }

    if (user.following.includes(args.followId)) {
      await ctx.db.patch(user._id, {
        following: user.following.filter((id) => id !== args.followId),
      });
      await ctx.db.patch(args.followId, {
        followers: followUser.following.filter((id) => id !== user._id),
      });
      return { message: "User unfollowed successfully" };
    } else {
      await ctx.db.patch(user._id, {
        following: [...user.following, args.followId],
      });
      await ctx.db.patch(args.followId, {
        followers: [...followUser.following, user._id],
      });
      return { message: "User followed successfully" };
    }
  },
});

export const updateUserData = mutation({
  args: {
    name: v.string(),
    imageId: v.optional(v.id("_storage")),
    bio: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerk_Id", identity.subject))
      .first();

    if (!user) {
      throw new ConvexError("User does not exist");
    }

    let fileUrl = null;
    let fileId = null;
    if (args.imageId) {
      fileId = args.imageId;
      fileUrl = await ctx.storage.getUrl(args.imageId);
    } else {
      fileUrl = user.imageId;
      fileUrl = user.imageUrl;
    }

    await ctx.db.patch(user._id, {
      name: args.name,
      imageId: fileId!,
      imageUrl: fileUrl!,
      bio: args.bio,
    });

    const userPosts = await ctx.db
      .query("posts")
      .filter((q) => q.eq(q.field("authorId"), user._id))
      .collect();

    for (const post of userPosts) {
      await ctx.db.patch(post._id, {
        authorName: args.name,
        authorImage: fileUrl!,
      });
    }

    return {
      message: "Updated successfully",
    };
  },
});

export const getUsersYouMayKnow = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("User not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerk_Id", identity.subject))
      .first();
    if (!user) {
      throw new ConvexError("User does not exist");
    }

    const users = await ctx.db.query("users").collect();
    let usersYouMayKnow = users.filter(
      (u) => !user.following.includes(u._id) && u._id !== user._id
    );

    if (usersYouMayKnow.length > 4) {
      usersYouMayKnow = usersYouMayKnow.slice(0, 4);
    }
    if (usersYouMayKnow.length === 0) {
      usersYouMayKnow = users.filter((u) => u._id !== user._id).slice(0, 4);
    }

    return usersYouMayKnow;
  },
});
