import { Clock, CheckCircle, XCircle } from "lucide-react";

interface SwMileageStatusBadgeProps {
  status: 0 | 1 | 2;
}

const SwMileageStatusBadge = ({ status }: SwMileageStatusBadgeProps) => {
  const statusConfig = {
    2: {
      text: "대기중",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      icon: <Clock className="h-3 w-3" />,
    },
    1: {
      text: "승인",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      icon: <CheckCircle className="h-3 w-3" />,
    },
    0: {
      text: "반려",
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      icon: <XCircle className="h-3 w-3" />,
    },
  };

  const config = statusConfig[status];
  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}
    >
      {config.icon}
      {config.text}
    </div>
  );
};

export default SwMileageStatusBadge; 