interface CustomerHeaderProps {
  totalUsers: number;
}

export default function CustomerHeader({ totalUsers }: CustomerHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-semibold text-[#E5E1E4]">
        Customer Insights
      </h1>

      <p className="text-sm mt-1">
        <span className="text-[#4EDEA3] text-sm md:text-base font-bold">
          • {totalUsers.toLocaleString()}
        </span>

        <span className="text-sm md:text-base text-[#C7C4D7] font-normal">
          {" "}
          active users currently online
        </span>
      </p>
    </div>
  );
}
