import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { title, clipUrl, user, weapon, map } = req.body;
  const result = await prisma.clip.create({
    data: {
      title: title,
      clipUrl: clipUrl,
      authorId: user.id,
      weaponId: weapon.id,
      mapId: map.id,
    },
  });
  res.json(result);
}
