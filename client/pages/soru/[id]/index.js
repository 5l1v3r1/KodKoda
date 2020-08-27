import { useRouter } from "next/router";
import { useUser } from "../../../utils/auth/useUser";
import Link from "next/link";
import PostLayout from "../../../layouts/Post/PostLayout";
import PostBody from "../../../components/Post/PostBody";
import useSWR from "swr";
import CircularProgress from "@material-ui/core/CircularProgress";
import { post } from "../../../utils/db/schemas";

const fetcher = async (...args) => {
  const res = await fetch(...args);
  return res.json();
};

const postResponse = (rData) =>
  fetch("/api/soru/postResponse", {
    method: "POST",
    body: JSON.stringify(rData),
  }).then((res) => res.json());

const deletePost = (userid, postid) =>
  fetch('/api/soru/delete', {
    method: 'POST',
    body: JSON.stringify({ userId: userid, postId: postid })
  }).then((res) => res.json())

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, logout } = useUser();
  const { data, error, mutate } = useSWR(`/api/soru/${id}`, fetcher);

  const onMutate = (rData) => {
    mutate(async (data) => {
      const result = await postResponse(rData);
      return {
        ...data,
        a: result.a
      };
    }, false);
  };

  const handleDelete = (rData) =>{
  }
  return (
    <>
      <PostLayout auth={user ? true : false} logOut={logout} authPage={false}>
        {!data ? (
          <CircularProgress />
        ) : (
          <PostBody
            id={id}
            userId={user ? user.id : null}
            userName={user ? user.username : null}
            data={data}
            mutate={mutate}
            onMutate={onMutate}
            handleDelete={handleDelete}
          />
        )}
      </PostLayout>
    </>
  );
};

export default Post;
