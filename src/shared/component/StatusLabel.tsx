import { cn } from "@/shared/utils";

type StatusLabelProps = {
  status: number; // 1: 생성, 2: 승인, 3: 반려
};

const StatusLabel = ({ status }: StatusLabelProps) => {
  const getStatusInfo = (status: number) => {
    switch (status) {
      case 1:
        return { text: "생성", className: "text-pending bg-pending/10 border-pending/20" };
      case 2:
        return { text: "승인", className: "text-approved bg-approved/10 border-approved/20" };
      case 3:
        return { text: "반려", className: "text-destructive bg-destructive/10 border-destructive/20" };
      default:
        return { text: "알 수 없음", className: "text-gray-500 bg-gray-100 border-gray-200" };
    }
  };

  const { text, className } = getStatusInfo(status);

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
      className
    )}>
      {text}
    </span>
  );
};

export default StatusLabel; 