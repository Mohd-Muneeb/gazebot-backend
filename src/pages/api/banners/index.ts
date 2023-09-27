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
  
      default:
        break;
    }
  }
  
  async function getProducts() {
      const data = query(collection(db, "banners"));
  
      const querySnapshot = await getDocs(data);
  
      const products: DocumentData[] = [];
  
      querySnapshot.forEach((doc) => {
        products.push(doc.data());
      });
  
  
      return products;
  }
  