import type { MileageTokenWithActivateStatus } from "@entities/mileage-token";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui";
import { parseToFormattedDate } from "@shared/lib";
import TokenActivationDialog from "./TokenActivateDialog";

interface TokenInfoTableProps {
	mileageTokenList: MileageTokenWithActivateStatus[];
}

function TokenInfoTable({ mileageTokenList }: TokenInfoTableProps) {
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
				{mileageTokenList.map((mileageToken) => (
					<TableRow key={mileageToken.id}>
						<TableCell className="font-medium">
							{mileageToken.name}
						</TableCell>
						<TableCell className="w-[100px]">
							{mileageToken.symbol}
						</TableCell>
						<TableCell>{mileageToken.contractAddress}</TableCell>
						<TableCell>
							{parseToFormattedDate(mileageToken.createdAt.toString())}
						</TableCell>
						<TableCell className="text-center">
							<TokenActivationDialog
								isActive={mileageToken.isActivate}
								mileageTokenId={Number(mileageToken.id)}
								contractAddress={mileageToken.contractAddress}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

export default TokenInfoTable;
