//🥠🥠[GETSTATICPROPS TO PAGES]🥠🥠

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {/* <li>Product 1</li>
      <li>Product 2</li>
      <li>Product 3</li> */}
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
    // 🥠🥠[GETSTATICPROPS TO PAGES]🥠🥠 here we are creating a Dynamic list thanks to "getStaticProps", the hardcode of that list is above
  );
}

export async function getStaticProps() {
  return {
    props: {
      products: [{ id: "p1", title: "Product 1" }],
    },
  }; //🥠🥠[GETSTATICPROPS TO PAGES]🥠🥠this function should always return an object {...}
}

export default HomePage;
