import { profile } from "console";
import { internalMutation, query } from "./_generated/server";
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
