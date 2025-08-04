// 상태 표시 컴포넌트
const TransactionStatusLabel = ({ status }: { status: number }) => {
  const getStatusInfo = (status: number) => {
    switch (status) {
      case 0: return { text: "실패", className: "text-destructive" };
      case 1: return { text: "생성", className: "text-pending" };
      case 2: return { text: "완료", className: "text-approved" };
      default: return { text: "알 수 없음", className: "bg-gray-100 text-gray-800" };
    }
  };

  const { text, className } = getStatusInfo(status);
  
  return (
    <span className={`text-xs font-medium ${className}`}>
      {text}
    </span>
  );
};

export default TransactionStatusLabel;