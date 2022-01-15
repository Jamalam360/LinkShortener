import type { APIHandler } from "aleph/types.d.ts";
import { Bson, MongoClient } from "mongo";

interface Link {
  _id: Bson.ObjectId;
  shortened: string;
  full: string;
}

const client = new MongoClient();
await client.connect("mongodb://localhost:27017");
const db = client.database("link_shortener");
const links = db.collection<Link>("links");

export async function getFullLink(shortened: string): Promise<string> {
  const link = await links.findOne({ shortened: shortened });
  if (link) {
    return link.full;
  } else {
    throw new Error("Link not found");
  }
}

async function getShortenedLink(full: string): Promise<string> {
  const existingLink = await links.findOne({ full: full });

  if (existingLink) {
    return existingLink.shortened;
  } else {
    const allowedCharacters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
    ];
    let shortened = "";
    for (let i = 0; i < 4; i++) {
      shortened +=
        allowedCharacters[Math.floor(Math.random() * allowedCharacters.length)];
    }

    const linkId = await links.insertOne({ full: full, shortened: shortened });
    const link = (await links.findOne({ _id: linkId })) as Link;
    return link.shortened;
  }
}

export const handler: APIHandler = async ({ response, request }) => {
  if (request.method == "POST") {
    let shortened: string = (await request.json()).link;

    if (shortened.includes("/")) {
      const arr = shortened.split("/");
      shortened = arr[arr.length - 1];
    }

    const full = await getFullLink(shortened);
    console.log(full);
    response.json({ link: full });
  } else if (request.method == "PUT") {
    const full = (await request.json()).link;
    const shortened = await getShortenedLink(full);
    response.json({ link: "https://l.jamalam.tech/api/" + shortened })
  }
};
