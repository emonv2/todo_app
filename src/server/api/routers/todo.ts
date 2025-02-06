import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { todos } from "~/server/db/schema";

export const todoRouter = createTRPCRouter({
  getAllTodosCount: publicProcedure.query(async ({ ctx }) => {
    const allData = await ctx.db.query.todos.findMany();
    return allData.length;
  }),

  getAllUserCount: publicProcedure.query(async ({ ctx }) => {
    const allUser = await ctx.db.query.user.findMany();
    return allUser.length;
  }),

  getOwnTodos: protectedProcedure.query(async ({ ctx }) => {
    const myTodo = await ctx.db
      .select()
      .from(todos)
      .where(eq(todos.createdById, ctx.session.user.id));

    return myTodo;
  }),
});
