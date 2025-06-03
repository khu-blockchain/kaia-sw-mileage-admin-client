import { SwMileageToken } from "@/entities/token";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/shared/ui";
import { parseToFormattedDate } from "@/shared/utils";
import TokenActivationDialog from "@/widget/token/TokenActivateDialog";

const TokenInfoTable = ({
  swMileageTokenList,
}: {
  swMileageTokenList: SwMileageToken[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">이름</TableHead>
          <TableHead className="w-[100px]">심볼</TableHead>
          <TableHead>컨트랙트 주소</TableHead>
          <TableHead>생성 일시</TableHead>
          <TableHead className="text-center">활성화</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {swMileageTokenList.map((swMileageToken) => (
          <TableRow key={swMileageToken.sw_mileage_token_id}>
            <TableCell className="font-medium">
              {swMileageToken.sw_mileage_token_name}
            </TableCell>
            <TableCell className="w-[100px]">
              {swMileageToken.sw_mileage_token_symbol}
            </TableCell>
            <TableCell>{swMileageToken.contract_address}</TableCell>
            <TableCell>
              {parseToFormattedDate(swMileageToken.created_at)}
            </TableCell>
            <TableCell className="text-center">
              <TokenActivationDialog
                isActive={swMileageToken.is_activated}
                swMileageTokenId={Number(swMileageToken.sw_mileage_token_id)}
                swMileageTokenContractAddress={swMileageToken.contract_address}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TokenInfoTable;
