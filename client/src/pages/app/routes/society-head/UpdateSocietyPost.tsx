import { useParams } from "react-router-dom";
import { useGetSocietyPostDetails } from "../../hooks/society-head/useSocietyHead";
import LoadingBar from "@/components/LoadingBar";
import SocietyHeadErrorComponent from "../../components/society-head/SocietyHeadErrorComponent";
import UpdateSocietyPostForm from "../../components/society-head/UpdateSocietyPostForm";

const UpdateSocietyPost = () => {
  const { id, postId } = useParams();

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useGetSocietyPostDetails(postId as string);

  if (isLoading) return <LoadingBar />;

  if (isError || !post?.id)
    return (
      <SocietyHeadErrorComponent
        title={!post?.id ? "Society post not found" : "Something went wrong"}
        error={error}
      />
    );

  return (
    <>
      <UpdateSocietyPostForm societyId={id as string} post={post} />
    </>
  );
};

export default UpdateSocietyPost;
