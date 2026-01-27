const { PrismaClient } = require("@prisma/client");

// initialize prisma client
const prisma = new PrismaClient();

module.exports = prisma;