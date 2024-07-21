import { PrismaClient } from "@prisma/client";

const prismaClient = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClient>;
}

const prisma = globalThis.prismaGlobal ?? prismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
