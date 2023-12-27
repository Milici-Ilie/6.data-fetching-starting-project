function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}
//🦯🦯[GET.SERVER.SIDE.PROPS]🦯🦯 this file/page is just an example where we dont pre=generate files in advance
export default UserIdPage;

export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
