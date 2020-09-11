import React, { useState, useEffect} from "react";
import { useRouter } from "next/router";
import { useUser } from "../utils/auth/useUser";
import { Layout , Main} from "../components";
import useSWR from "swr";

const fetcher = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

const fetchSize = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json"}, token),
    credentials: "same-origin",
  }).then((res) => res.json());


const Index = props => {
  const { user, logout } = useUser();

  
  const router = useRouter()
  const { pathname, query } = router
  const [ count, setCount ] = useState(0);
  //const { size } = useSWR("/api/size", fetchSize);
  const { data, error, mutate } = useSWR(`/api/main/${query.sayfa || 1}`, fetcher);

  const reload = () => {
    router.push(format({ pathname, query }))
  }

  const incrementPage = () => {
    const currentPage = query.sayfa ? parseInt(query.sayfa) : 1
    const href = `/?sayfa=${currentPage + 1}`
    router.push(href, href, { shallow: true })
  }

  return (
    <Layout user={user ? user : null} auth={user ? true : false} logOut={logout} authPage={false}>
      <Main auth={user ? true : false} userId={user ? user.id : null} data={data} onClick={incrementPage} mutateFunc={mutate} />
    </Layout>
  );
};


export default Index;
