"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import useSWR from "swr";
import { User } from "../types";
import { fetcher } from "../utils/fetcher";
import { Spinner } from "@nextui-org/spinner";
import RefreshIcon from "./icons/RefreshIcon";
import { useMemo, useState } from "react";

const columns = [
  {
    key: "number",
    label: "#",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "score",
    label: "SCORE",
  },
  {
    key: "createdAt",
    label: "SUBMITTED AT",
  },
];

const LatestScores = () => {
  const { data, isLoading } = useSWR<Array<User>>("/api/users", fetcher);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return data?.length ? Math.ceil(data.length / rowsPerPage) : 0;
  }, [data?.length, rowsPerPage]);

  const items = useMemo(() => {
    if (!data) return [];

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data?.slice(start, end);
  }, [page, data]);

  return (
    <section>
      <h2 className="my-4 flex items-center gap-1.5 text-2xl font-medium">
        Latest Scores
        <span>
          <RefreshIcon />
        </span>
      </h2>
      <Table
        aria-label="Example table with dynamic content"
        bottomContent={
          pages > 0 && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="success"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          )
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner color="success" />}
          items={items}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                if (columnKey === "number") {
                  return (
                    <TableCell>{(data?.indexOf(item) ?? -1) + 1}</TableCell>
                  );
                }

                if (columnKey === "createdAt") {
                  const date = new Date(item.createdAt);

                  return <TableCell>{date.toLocaleString()}</TableCell>;
                }

                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default LatestScores;
