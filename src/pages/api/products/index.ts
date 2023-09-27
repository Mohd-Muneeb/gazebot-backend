import {
  type DocumentData,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "~/db";

interface TitleSearch {
  title: string;
  id: string;
  subCategory: string;
  category: string;
  price: number;
  rating: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET": {
      const query = req.query;

      const title = query.title as string;

      const id = query.id as string;

      const data = await getProducts(id, title);
      res.status(200).send(data);
      break;
    }

    case "POST": {
      // const { product } =  as string;

      const data = await postProducts(req.body);
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

async function getProducts(id: string, title: string) {
  console.log(id, title);
  if (title != undefined) {
    const data = query(collection(db, "titles"), where("title", ">=", title));

    const querySnapshot = await getDocs(data);

    const products: DocumentData[] = [];

    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });

    const searchRes = products.map(async (d: DocumentData | TitleSearch) => {
      const id = d.id as string;
      const category = d.category as string;
      const subCategory = d.subCategory as string;

      const document = doc(db, "products", category, subCategory, id);

      const data = await getDoc(document);
      return data.data();
    });

    return searchRes;
  }

  if (id != undefined) {
    const docRef = doc(db, "products", id);
    const data = await getDoc(docRef);

    return data.data();
  }
  //   else {
  //     const productQuery = query(
  //       collection(db, "products"),
  //       where("title", "==", title),
  //     );

  //     const data = await getDocs(productQuery);

  //     const products: DocumentData[] = [];

  //     data.forEach((doc) => products.push(doc.data()));

  //     return products;
  //   }

  return "Figure this out now lol";
}

import { setDoc } from "firebase/firestore";

async function postProducts(product: unknown) {
  try {
    const productRef = doc(
      collection(db, "products", product.category, product.subCategory),
    );

    await setDoc(productRef, product);

    const configData = {
      id: productRef.id,
      name: product.name,
      price: product.price,
      rating: product.rating,
      category: product.category,
      subCategory: product.subCategory,
    };

    await setDoc(doc(db, "config", productRef.id), configData);

    return "Success";
  } catch (err) {
    console.log(err, "Error occured");
    return err;
  }
}

async function updateProducts() {}
