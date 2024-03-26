import { useEffect, useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Typography } from "@mui/material";
import NoQuestions from "./NoQuestions";
import {
  clearActiveQuestion,
  getActiveQuestion,
} from "@/lib/features/questions/questionsSlice";
import { openModal } from "@/lib/features/ui/uiSlice";

interface Column {
  id: "title" | "owner" | "lastModified" | "responses";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "title", label: "Question", minWidth: 200 },
  { id: "owner", label: "Owner", minWidth: 100 },
  {
    id: "lastModified",
    label: "Last Modified",
    minWidth: 100,
  },
  {
    id: "responses",
    label: "Responses",
    minWidth: 80,
  },
];

interface Data {
  code: string;
  title: string;
  owner: string;
  lastModified: string;
  responses: number;
}

function createData(
  code: string,
  title: string,
  owner: string,
  lastModified: string,
  responses: number
): Data {
  return { code, title, owner, lastModified, responses };
}

// Loop through the questions object and create an array

export default function Questions() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const questions = useAppSelector((state) => state.questions.allQuestions);
  const dispatch = useAppDispatch();

  // Define the rows based on the question object using the createData function
  const rows = useMemo(() => {
    const rowsArray: Data[] = [];
    if (questions) {
      Object.keys(questions).forEach((key) => {
        rowsArray.push(
          createData(
            key,
            questions[key].question,
            "me",
            new Date().toLocaleDateString(),
            0
          )
        );
      });
    }

    return rowsArray;
  }, [questions]);

  const handleClick = (code: string) => {
    setSelectedRow((prevCode) => (prevCode === code ? null : code));
    // const selectedData = rows?.filter((row) => row.code === code);
    dispatch(getActiveQuestion(code));
    dispatch(openModal("details"))
    // console.log(code, selectedData);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (selectedRow === null) dispatch(clearActiveQuestion());
  }, [dispatch, selectedRow]);

  if (rows.length === 0) {
    return <NoQuestions tab="questions" />;
  }

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", border: "1px solid lightgrey" }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isSelected = row.code === selectedRow;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    selected={isSelected}
                    onClick={handleClick.bind(null, row.code)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={
                            column.id === "title"
                              ? {
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  maxWidth: column.minWidth,
                                }
                              : {}
                          }
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
