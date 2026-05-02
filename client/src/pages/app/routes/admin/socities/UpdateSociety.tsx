import LoadingBar from "@/components/LoadingBar";
import AdminErrorComponent from "@/pages/app/components/admin/AdminErrorComponent";
import UpdateSocietyForm from "@/pages/app/components/admin/UpdateSocietyForm";
import { useGetSocietyDetails } from "@/pages/app/hooks/admin/useAdmin";
import { useParams } from "react-router-dom";

const UpdateSociety = () => {
  const { id } = useParams();

  const {
    data: society,
    isLoading,
    isError,
    error,
  } = useGetSocietyDetails(id as string);

  if (isLoading) return <LoadingBar />;

  if (isError || !society?.id)
    return (
      <AdminErrorComponent
        title={!society?.id ? "Society not found" : "Something went wrong"}
        error={error}
      />
    );

  return (
    <>
      <UpdateSocietyForm society={society} />
    </>
  );
};

export default UpdateSociety;
