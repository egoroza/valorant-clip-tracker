import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { userToAdd } = req.body;
  const result = await prisma.user.create({
    data: {
      name: userToAdd,
    },
  });
  res.json(result);
}
