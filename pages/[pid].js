import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";
//🧨🧨[DYNAMIC PARAMETERS]🧨🧨

function ProductDetailPage(props) {
  const { loadedProduct } = props; //destructuring the 'loadedProduct' from the 'return' from bellow === NOTE! now we can insert the data from our destructuured props 'loadedProduct' and include those in our <h1>{loadedProduct.title}</h1> and <p>{loadedProduct.description}</p> === NOTE!!! after we did all here on this file we must go back in the 'index.js' file and include our 'list' inside of <Link> ... here ... </Link>

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); //code from 'index.js' file
  const jsonData = await fs.readFile(filePath); //code from 'index.js' file
  const data = JSON.parse(jsonData); //code from 'index.js' file

  const product = data.products.find((product) => product.id === productId); //🧨🧨[DYNAMIC PARAMETERS]🧨🧨 this variable will check inside of our Array 'data' variable from above if there is some 'product.id' equal to 'productId', if will find some 'product.id' than return the content bellow 👇

  return {
    props: {
      loadedProduct: product,
    }, //here we are returning the 'product' equal to 'productId' depending on the name/id ==== NOTE! now we can extract/destructure the 'loadedProduct' up in our 'ProductDetailPage' to take directly & dynamic the data from the BACKEND file 👆
  };
} //🧨🧨[DYNAMIC PARAMETERS]🧨🧨 this function will return only 1 value from the 'dummy-backend' file

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: false,
  };
}

export default ProductDetailPage;
