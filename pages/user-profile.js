function UserProfilePage(props) {
  //🦯🦯[GET.SERVER.SIDE.PROPS]🦯🦯 this should be a page that can't get acces to every User because of confidentiality

  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context; // 'params'= if we had a dynamic Folder/page we still have acces to 'params', for more info's about 'params' check the other function 'getStaticProps' or ask ChatGPT === 'req' & 'res' = sent a request object and get a response object => in our case the sending back a response will be handled by NextJS, so no worry about it, but we can manipulate the response that reached the server

  // console.log(req);
  // console.log(res);

  console.log("Server side code"); //this log will activate when the 'user-profile' is activated

  return {
    props: {
      username: "Max",
    },
  };
} //🦯🦯[GET.SERVER.SIDE.PROPS]🦯🦯 this function is also the same as 'getStaticProps', it should have a 'props:' key, it should have a 'not found' key and also a 'redirect' key. The only difference is that this function doesn't need a 'revalidate' key to re-render pages at specific number of seconds that we specifye, bcs this function will auttomatically re-render the page every time when the User access it
