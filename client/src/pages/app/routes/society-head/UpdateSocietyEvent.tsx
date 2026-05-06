import { useParams } from "react-router-dom";
import { useGetSocietyEventDetails } from "../../hooks/society-head/useSocietyHead";
import LoadingBar from "@/components/LoadingBar";
import SocietyHeadErrorComponent from "../../components/society-head/SocietyHeadErrorComponent";
import UpdateSocietyEventForm from "../../components/society-head/UpdateSocietyEventForm";

const UpdateSocietyEvent = () => {
  const { id, eventId } = useParams();

  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useGetSocietyEventDetails(eventId as string);

  if (isLoading) return <LoadingBar />;

  if (isError || !event?.id)
    return (
      <SocietyHeadErrorComponent
        title={!event?.id ? "Society event not found" : "Something went wrong"}
        error={error}
      />
    );
  return (
    <>
      <UpdateSocietyEventForm societyId={id as string} event={event} />
    </>
  );
};

export default UpdateSocietyEvent;
