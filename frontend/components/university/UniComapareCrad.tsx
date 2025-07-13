export default ({ uni }: { uni: any }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="grid gap-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-500">Established In</span>
          <span className="font-semibold text-gray-800">
            {uni.data?.college?.established || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Type of Instution</span>
          <span className="font-semibold text-gray-800">
            {uni.data?.college?.type || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Total Courses</span>
          <span className="font-semibold text-gray-800">
            {uni.data?.college?.CollegesCourses?.length ?? "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Score</span>
          <span className="font-semibold text-gray-800">
            {uni.data?.college?.score ?? "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Total Students</span>
          <span className="font-semibold text-gray-800">
            {uni.data?.college?.total_students ?? "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Acceptance Rate</span>
          <span className="font-semibold text-gray-800">
            {uni.data?.college?.acceptance_rate ?? "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Intl. Student Rate</span>
          <span className="font-semibold text-gray-800">
            {uni.data?.college?.international_student_rate ?? "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Intake</span>
          <span className="font-semibold text-gray-800">
            {uni.data?.college?.intake || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Level</span>
          <span className="font-semibold text-gray-800">
            {uni.data?.college?.level || "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">PR Pathway</span>
          <span className="font-semibold text-gray-800">
            {uni.data?.college?.pr_pathway ? "Yes" : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};
