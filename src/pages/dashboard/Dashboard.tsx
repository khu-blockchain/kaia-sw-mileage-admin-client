import { useGetSwMileageTokenList } from "@/features/token";
import { useGetSwMileageList } from "@/features/mileage";
import { useGetWalletLostList } from "@/features/walletLost";
import { PageLayout } from "@/widget/_frgment";
import { PageBoundary } from "@/widget/_suspense";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/shared/ui";
import {
  CircleAlert,
  Coins,
  Users,
  Wallet,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { ACTIVITY_CATEGORIES } from "@/shared/constants";
import {
  parseToFormattedDate,
  parseToFormattedDateTime,
  sliceWalletAddress,
} from "@/shared/utils";
import { SwMileageStatusBadge } from "@/shared/component";

const Dashboard = () => {
  return (
    <PageBoundary>
      <PageLayout index="대시보드" title="SW 마일리지 관리 시스템">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatisticsCards />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ActiveTokenSection />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <RecentMileageRequestSection />
              <RecentWalletLostSection />
            </div>
          </div>
        </div>
      </PageLayout>
    </PageBoundary>
  );
};

const StatisticsCards = () => {
  const { data: mileageData } = useGetSwMileageList({});
  const {
    data: { list: walletLostData },
  } = useGetWalletLostList();
  const { data: tokenData } = useGetSwMileageTokenList();

  const mileageStats = useMemo(() => {
    const total = mileageData.length;
    const pending = mileageData.filter((item) => item.status === 2).length;
    const approved = mileageData.filter((item) => item.status === 1).length;
    const rejected = mileageData.filter((item) => item.status === 0).length;
    return { total, pending, approved, rejected };
  }, [mileageData]);

  const walletStats = useMemo(() => {
    const total = walletLostData.length;
    const pending = walletLostData.filter(
      (item) => item.is_confirmed === 0
    ).length;
    const completed = walletLostData.filter(
      (item) => item.is_confirmed === 1
    ).length;
    return { total, pending, completed };
  }, [walletLostData]);

  const activeTokensCount = useMemo(() => {
    return tokenData.filter((token) => token.is_activated).length;
  }, [tokenData]);

  return (
    <>
      <StatCard
        title="전체 마일리지 신청"
        value={mileageStats.total}
        icon={<TrendingUp className="h-5 w-5" />}
        color="bg-blue-50 text-blue-600"
        iconColor="text-blue-600"
      />
      <StatCard
        title="대기중인 신청"
        value={mileageStats.pending}
        icon={<Clock className="h-5 w-5" />}
        color="bg-yellow-50 text-yellow-600"
        iconColor="text-yellow-600"
      />
      <StatCard
        title="지갑 변경 요청"
        value={walletStats.pending}
        icon={<Wallet className="h-5 w-5" />}
        color="bg-purple-50 text-purple-600"
        iconColor="text-purple-600"
      />
      <StatCard
        title="활성 토큰"
        value={activeTokensCount}
        icon={<Coins className="h-5 w-5" />}
        color="bg-green-50 text-green-600"
        iconColor="text-green-600"
      />
    </>
  );
};

const StatCard = ({
  title,
  value,
  icon,
  color,
  iconColor,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  iconColor: string;
}) => (
  <div className="bg-white rounded-lg border p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      {/* <div className={`rounded-lg p-3 ${color}`}>
        <div className={iconColor}>{icon}</div>
      </div> */}
    </div>
  </div>
);

const ActiveTokenSection = () => {
  const navigate = useNavigate();
  const { data: swMileageTokenList } = useGetSwMileageTokenList();

  const activeToken = useMemo(
    () => swMileageTokenList.find((token) => token.is_activated),
    [swMileageTokenList]
  );

  return (
    <div className="bg-white rounded-lg border p-4 h-fit">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-green-100 p-2 rounded-lg">
          <Coins className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-body">활성화된 토큰</h2>
          <p className="text-sm text-gray-500">현재 사용중인 마일리지 토큰</p>
        </div>
      </div>

      {!activeToken ? (
        <div className="text-center py-8">
          <div className="bg-gray-100 p-3 rounded-lg inline-block mb-3">
            <CircleAlert className="h-6 w-6 text-gray-500" />
          </div>
          <p className="text-gray-500 text-sm mb-4">
            활성화된 마일리지 토큰이 없습니다.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/manage-token")}
          >
            토큰 관리하기
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                활성 상태
              </span>
            </div>
            <h3 className="font-bold text-lg text-blue-900">
              {activeToken.sw_mileage_token_name}
            </h3>
            <p className="text-blue-700 text-sm">
              {activeToken.sw_mileage_token_symbol}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">생성일</span>
              <span className="text-sm font-medium">
                {parseToFormattedDate(activeToken.created_at)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">설명</span>
              <span className="text-sm font-medium">
                {activeToken.description || "설명 없음"}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => navigate("/manage-token")}
          >
            토큰 관리하기
          </Button>
        </div>
      )}
    </div>
  );
};

const RecentMileageRequestSection = () => {
  const navigate = useNavigate();
  const { data } = useGetSwMileageList({});

  const recentRequests = useMemo(() => data.slice(0, 5), [data]);

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
              {/* <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div> */}
          <div>
            <h2 className="text-lg font-semibold text-body">
              최근 마일리지 신청
            </h2>
            <p className="text-sm text-gray-500">최근 5개 신청 내역</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/request")}
        >
          전체보기
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-2 text-sm">신청일</TableHead>
              <TableHead className="py-2 text-sm">이름</TableHead>
              <TableHead className="py-2 text-sm">학번</TableHead>
              <TableHead className="py-2 text-sm">활동 분야</TableHead>
              <TableHead className="py-2 text-sm">상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentRequests.length > 0 ? (
              recentRequests.map((request) => (
                <TableRow
                  key={request.sw_mileage_id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/request/${request.sw_mileage_id}`)}
                >
                  <TableCell className="py-2 text-sm">
                    {parseToFormattedDate(request.created_at)}
                  </TableCell>
                  <TableCell className="py-2 text-sm">{request.name}</TableCell>
                  <TableCell className="py-2 text-sm">
                    {request.student_id}
                  </TableCell>
                  <TableCell className="py-2 text-sm">
                    {
                      ACTIVITY_CATEGORIES[
                        request.academic_field as keyof typeof ACTIVITY_CATEGORIES
                      ]
                    }
                  </TableCell>
                  <TableCell className="py-2 text-sm">
                    <SwMileageStatusBadge status={request.status} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-4 text-gray-500 text-sm"
                >
                  조회된 데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const RecentWalletLostSection = () => {
  const navigate = useNavigate();
  const {
    data: { list },
  } = useGetWalletLostList();

  const recentWalletRequests = useMemo(() => list.slice(0, 5), [list]);

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* <div className="bg-purple-100 p-2 rounded-lg">
            <Wallet className="h-5 w-5 text-purple-600" />
          </div> */}
          <div>
            <h2 className="text-lg font-semibold text-body">
              최근 지갑 변경 요청
            </h2>
            <p className="text-sm text-gray-500">최근 5개 변경 요청</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/wallet-change")}
        >
          전체보기
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-2 text-sm">학번</TableHead>
              <TableHead className="py-2 text-sm">이름</TableHead>
              <TableHead className="py-2 text-sm">기존 계정</TableHead>
              <TableHead className="py-2 text-sm">변경할 계정</TableHead>
              <TableHead className="py-2 text-sm">상태</TableHead>
              <TableHead className="py-2 text-sm">요청일시</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentWalletRequests.length > 0 ? (
              recentWalletRequests.map((request) => (
                <TableRow key={request.wallet_history_id}>
                  <TableCell className="py-2 text-sm">
                    {request.student_id}
                  </TableCell>
                  <TableCell className="py-2 text-sm">{request.name}</TableCell>
                  <TableCell className="py-2 text-sm">
                    {sliceWalletAddress(request.address, 6)}
                  </TableCell>
                  <TableCell className="py-2 text-sm">
                    {sliceWalletAddress(request.target_address, 6)}
                  </TableCell>
                  <TableCell className="py-2 text-sm">
                    {request.is_confirmed === 0 ? (
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <Clock className="h-3 w-3" />
                        요청됨
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3" />
                        처리 완료
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="py-2 text-sm">
                    {parseToFormattedDateTime(request.created_at)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-4 text-gray-500 text-sm"
                >
                  조회된 데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
