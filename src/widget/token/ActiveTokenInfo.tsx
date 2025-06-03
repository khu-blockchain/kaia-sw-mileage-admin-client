import { SwMileageToken } from "@/entities/token";

const ActiveTokenInfo = ({ activeToken }: { activeToken: SwMileageToken }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-start items-center gap-4">
        <img
          src={activeToken.sw_mileage_token_image_url}
          alt="logo"
          className="w-12 h-12 p-1 border border-border rounded-full object-contain"
        />
        <div className="flex flex-col gap-1/2">
          <p className="text-md text-body font-semibold">
            {activeToken.sw_mileage_token_name}
          </p>
          <p className="text-sm text-body">{activeToken.description}</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ActiveTokenInfo;
