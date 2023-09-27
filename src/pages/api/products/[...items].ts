import { NextApiRequest, NextApiResponse } from "next";
import db from "~/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET": {
      const query = req.query;

      console.log(query);

      const rating = parseInt(query.rating as string);
      const price = parseInt(query.price as string);

      const data = await getProducts();
      res.status(200).send(data);
      break;
    }

    case "POST": {
      const data = await postProducts();
      res.status(200).send(data);
      break;
    }

    case "UPDATE": {
      const data = await updateProducts();
      break;
    }

    default:
      break;
  }
}

async function getProducts() {
  console.log("testing");
  return "Testing get";
}

async function postProducts() {
  // console.log("Testing push");

  return "TESTING POST";
}

async function updateProducts() {}
