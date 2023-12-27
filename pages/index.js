import path from "path"; //🐕‍🦺🐕‍🦺[SERVERS-SIDE CODE]🐕‍🦺🐕‍🦺
import fs from "fs/promises"; //🐕‍🦺🐕‍🦺[SERVERS-SIDE CODE]🐕‍🦺🐕‍🦺 importing File System
import Link from "next/link";

//🥠🥠[GETSTATICPROPS TO PAGES]🥠🥠

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {/* <li>Product 1</li>
      <li>Product 2</li>
      <li>Product 3</li> */}
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
        // 🧨🧨[DYNAMIC PARAMETERS]🧨🧨 here we includ our 'list' inside of 'Link' to create "path's" to our product 'description' page. NOTE! that the connection between pages is created auttomatically in the "href={`/${product.id}`}"
      ))}
    </ul>
    // 🥠🥠[GETSTATICPROPS TO PAGES]🥠🥠 here we are creating a Dynamic list thanks to "getStaticProps", the hardcode of that list is above
  );
}

export async function getStaticProps(context) {
  console.log("(re-)Generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); //🐕‍🦺🐕‍🦺[SERVERS-SIDE CODE]🐕‍🦺🐕‍🦺 so here we wanna build a 'path' that's starts at the current working directory 'cwd' from our code, (process.cwd) and than dives in to the 'data' folder, and than in the "dummy-backend.json" file, we can add an infinite amount of "path's"
  const jsonData = await fs.readFile(filePath); //🐕‍🦺🐕‍🦺[SERVERS-SIDE CODE]🐕‍🦺🐕‍🦺 this will read the "path" from above
  const data = JSON.parse(jsonData); //🐕‍🦺🐕‍🦺[SERVERS-SIDE CODE]🐕‍🦺🐕‍🦺 here we convert into a regular JavaScript object ==== NOTE !!! IMPORTANT !!! now this variable 'data' will be a "products" key wich hold an array of data's // "products" it's the name from our "dummy-backend" file === and now we can simply pass down in our "return" component the data from our "dummy-backend" 👇 "data.products" === now the variable "data" will take the info's and display the "products" from our "dummy-backend" file and sent it inside of our "HomdePage" function where we find a "map loop" over this array. This will display all the info's from the "dummy-backend" file

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    }; //🥨🥨[SERVERS-SIDE CODE]🥨🥨 here we are redirecting the user to another page if there are no 'data', no products... we will redirect the User to "/no-data" page wich we dont have created here, but you can created in you'r project
  }

  if (data.products.length === 0) {
    return { notFound: true }; //🥨🥨[SERVERS-SIDE CODE]🥨🥨 this is how we return a 'Not Found 404' page/Error 🥨🥨[SERVERS-SIDE CODE]🥨🥨 === if there are no products on our page this Error 404 will be displayed
  }

  return {
    props: {
      products: data.products,
    }, //🐕‍🦺🐕‍🦺[SERVERS-SIDE CODE]🐕‍🦺🐕‍🦺 👆
    revalidate: 10, //🥨🥨[SERVERS-SIDE CODE]🥨🥨 here we tell NextJS to reload the page when is in the production/released at every 10 secs, or what secs do we want🥨🥨[SERVERS-SIDE CODE]🥨🥨
  }; //🥠🥠[GETSTATICPROPS TO PAGES]🥠🥠this function should always return an object {...}
}

export default HomePage;
