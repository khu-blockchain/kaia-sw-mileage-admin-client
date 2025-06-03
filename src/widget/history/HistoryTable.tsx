import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/shared/ui";
import { SwMileageTokenHistory } from "@/entities/history";

type HistoryTableProps = {
  tableHeaders: { key: string; label: string }[];
  data: SwMileageTokenHistory[];
  mapper: (data: SwMileageTokenHistory[]) => any[];
};

const HistoryTable = ({ tableHeaders, data, mapper }: HistoryTableProps) => {
  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((col) => (
              <TableHead key={col.key} className="text-left">
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {mapper(data).length > 0 ? (
            mapper(data).map((row) => (
              <TableRow key={row.id}>
                {tableHeaders.map((col) => (
                  <TableCell key={`${row.id}-${col.key}`}>
                    {row[col.key as keyof typeof row]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableHeaders.length}
                className="text-center py-8 text-gray-500"
              >
                조회된 데이터가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoryTable;
