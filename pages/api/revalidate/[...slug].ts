import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_SECRET_TOKEN) {
    return res
      .status(401)
      .json({ message: "Invalid token", revalidated: false });
  }

  const slug = req.query.slug as Array<string>;
  const path = slug.join("/");

  try {
    await res.unstable_revalidate(`/${path}`);
    return res.status(200).json({ revalidated: true, path });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error revalidating");
  }
}
