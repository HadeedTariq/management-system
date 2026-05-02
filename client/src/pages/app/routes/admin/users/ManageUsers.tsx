import { useGetPlatformUsers } from "../../../hooks/admin/useAdmin";
import AdminErrorComponent from "../../../components/admin/AdminErrorComponent";
import PaginationSection from "../../../components/PaginationSection";
import { useSearchParams } from "react-router-dom";
import AdminUsersTable from "@/pages/app/components/admin/AdminUsersTable";

const ManageUsers = () => {
  const [params, setParams] = useSearchParams();

  const rawPage = Number(params.get("pageNo"));
  const page = !isNaN(rawPage) && rawPage > 0 ? rawPage : 1;

  const { data, isLoading, isError, error } = useGetPlatformUsers(page);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (data?.totalPages || 1)) {
      setParams({ pageNo: String(newPage) });
    }
  };

  if (isError) {
    return <AdminErrorComponent error={error} />;
  }

  return (
    <>
      <AdminUsersTable
        isLoading={isLoading}
        users={data?.users || []}
        totalUsers={data?.totalUsers}
        currentPageNumber={page}
      />

      {data && (
        <PaginationSection
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
          showQuickJump={true}
          maxVisiblePages={6}
        />
      )}
    </>
  );
};

export default ManageUsers;
