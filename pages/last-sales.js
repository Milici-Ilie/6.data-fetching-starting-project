import { useEffect, useState } from "react";
import useSWR from "swr";
//🧗‍♂️🧗‍♂️[CLIENT-SIDE FETCHING]🧗‍♂️🧗‍♂️ here we createed a BACKEND on 'FireBase' WEB site [check on internet] and connect with that Backend server

function LastSalesPage() {
  const [sales, setSales] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-course-a937c-default-rtdb.firebaseio.com/sales.json"
  ); //⏭⏭[USE-SWR HOOK]⏭⏭ ⏭⏭[USE-SWR HOOK]⏭⏭

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        id: key;
        username: data[key].username;
        volume: data[key].volume;
      }

      setSales(transformedSales); //⏭⏭[USE-SWR HOOK]⏭⏭
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://nextjs-course-a937c-default-rtdb.firebaseio.com/sales.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  if (!sales) {
    return <p>No data yet</p>;
  }

  // if (!data) {
  //   return <p>Loading...</p>;
  // }

  if (!data || !sales) {
    return <p>Loading...</p>;
  } //⏭⏭[USE-SWR HOOK]⏭⏭⏭⏭[USE-SWR HOOK]⏭⏭

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

//🐾🐾[PRE-FETCHING & CLIENT-SIDE FETCHING]🐾🐾
export async function getStaticProps() {
  return fetch(
    "https://nextjs-course-a937c-default-rtdb.firebaseio.com/sales.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      return { props: { sales: transformedSales }, revalidate: 10 };
    });
} //🐾🐾[PRE-FETCHING & CLIENT-SIDE FETCHING]🐾🐾

export default LastSalesPage;
//🧗‍♂️🧗‍♂️[CLIENT-SIDE FETCHING]🧗‍♂️🧗‍♂️
