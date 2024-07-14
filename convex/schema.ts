import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    email: v.string(),
    name: v.string(),
    imageUrl: v.optional(v.string()),
    clerk_Id: v.string(),
    bio: v.optional(v.string()),
    followers: v.array(v.id("users")),
    following: v.array(v.id("users")),
  }).index("by_clerkId", ["clerk_Id"]),

  posts: defineTable({
    caption: v.string(),
    tags: v.array(v.string()),
    location: v.string(),
    imageUrl: v.string(),
    imageId: v.string(),
    authorId: v.id("users"),
    authorName: v.string(),
    authorImage: v.string(),
    saved: v.array(v.string()),
    liked: v.array(v.string()),
  }).index("by_authorId", ["authorId"]),
});
