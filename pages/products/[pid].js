import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";
//🧨🧨[DYNAMIC PARAMETERS]🧨🧨

function ProductDetailPage(props) {
  const { loadedProduct } = props; //destructuring the 'loadedProduct' from the 'return' from bellow === NOTE! now we can insert the data from our destructuured props 'loadedProduct' and include those in our <h1>{loadedProduct.title}</h1> and <p>{loadedProduct.description}</p> === NOTE!!! after we did all here on this file we must go back in the 'index.js' file and include our 'list' inside of <Link> ... here ... </Link>

  if (!loadedProduct) {
    return <p>Loading...</p>;
  } //🚓🚓[GET.STATIC.PATHS]🚓🚓 in the situation that the User add directly the changees in URL we need to add a 'Loading...' state until NextJS fetches the Data, or a Spinner loading, etc ... NOTE!!! this 'Loading... ' will be displayed only on the pages that are not included in the 'pre-rendered' props from bellow 👇

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); //code from 'index.js' file
  const jsonData = await fs.readFile(filePath); //code from 'index.js' file
  const data = JSON.parse(jsonData);

  return data;
} //🚓🚓[GET.STATIC.PATHS]🚓🚓1) we need this 'getData' function to create Dynamically Paths === now check the 'getStaticProps' from bellow 👇

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData(); //🚓🚓[GET.STATIC.PATHS]🚓🚓 2) now we can call the 'data' here === also check 'getStaticPaths()' from bellow 👇

  // const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); //code from 'index.js' file
  // const jsonData = await fs.readFile(filePath); //code from 'index.js' file
  // const data = JSON.parse(jsonData); //code from 'index.js' file

  const product = data.products.find((product) => product.id === productId); //🧨🧨[DYNAMIC PARAMETERS]🧨🧨 this variable will check inside of our Array 'data' variable from above if there is some 'product.id' equal to 'productId', if will find some 'product.id' than return the content bellow 👇

  if (!product) {
    return { notFound: true };
  } //📃📃[404 PAGE ERROR]📃📃 if we dont have any product/any existing page than we want NextJS to return 'notFound'/ 'notFound = 404||page not found', given by default by NextJ, out of the box. By setting this to 'true' will activate the 404 error when there will be no files to found instead of crushing the App

  return {
    props: {
      loadedProduct: product,
    }, //here we are returning the 'product' equal to 'productId' depending on the name/id ==== NOTE! now we can extract/destructure the 'loadedProduct' up in our 'ProductDetailPage' to take directly & dynamic the data from the BACKEND file 👆
  };
} //🧨🧨[DYNAMIC PARAMETERS]🧨🧨 this function will return only 1 value from the 'dummy-backend' file

export async function getStaticPaths() {
  const data = await getData(); //🚓🚓[GET.STATIC.PATHS]🚓🚓 3) we need to call the 'data' also here

  const ids = data.products.map((product) => product.id); //🚓🚓[GET.STATIC.PATHS]🚓🚓 4) so here we are accessing the data from our 'dummy-backend' file, so we are looping over the Array from the backend file to extract the 'product.id'

  const pathsWithParams = ids.map((id) => ({ params: { pid: id } })); //🚓🚓[GET.STATIC.PATHS]🚓🚓 5) now we are looping over the 'ids' variable and connect tham with the 'id'

  return {
    paths: pathsWithParams, //🚓🚓[GET.STATIC.PATHS]🚓🚓 6) here we are calling the 'path's' between pages Dynamically, in this situation we are loading/pre-regenerating all the pages
    fallback: true,
  }; //🚓🚓[GET.STATIC.PATHS]🚓🚓 this 'fallback: true' will set to "true" pre-render only the pages that we select in the 'return{paths: [ ... here ...]}', here can be multiple pages that will be pre-generated before even the User click them, and the other pages will be 'generated' only when the User will click them. We do this to pages that are very frequently accessed and we want them to already be 'pre-rendered' to give the User a better experience. NOTE!!! It's not ok to add to much pages, like dozens, or hundreds  because will affect the performance
} //🚓🚓[GET.STATIC.PATHS]🚓🚓 to use 'falback' feature we must include up in our 'ProductDetailPage' function the Ternary Operator that checks if there is a 'loadedProduct' or not, bcs if the user add the Path directly in the URL the App will crash, that's why we must check for this kind of situation 👆

export default ProductDetailPage;
