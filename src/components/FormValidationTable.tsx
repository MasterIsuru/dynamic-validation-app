import { ValidationRule } from "../store/form.ts";
import { useMemo } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import useTableColumnHelper from "../hooks/useTableColumnHelper.ts";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type TableProps = {
  fieldType: string;
  validations: ValidationRule[];
  setOpen: (value: boolean) => void;
  setCurrentTab: (value: string) => void;
  setValidations: (value: ValidationRule[]) => void;
  setCurrentItem: (value: ValidationRule | null) => void;
};

export const FormValidationTable = ({
  setOpen,
  fieldType,
  validations,
  setCurrentTab,
  setCurrentItem,
  setValidations,
}: TableProps) => {
  const { getTableMetaData } = useTableColumnHelper();

  const tableMetaData = useMemo(() => {
    return getTableMetaData(fieldType);
  }, [fieldType]);

  const onDeleteRule = (id: number) => {
    if (!validations?.length) {
      return;
    }
    const filtered = validations.filter(
      (validation: ValidationRule) => validation.id !== id
    );
    setValidations(filtered);
  };

  return (
    <Box sx={style}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ marginBottom: 20 }}>
          <Typography variant="h6">Validation rules</Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableMetaData?.headers.map(
                (header: { id: number; label: string }) => (
                  <TableCell key={header.id}>
                    <b>{header.label}</b>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {validations?.length ? (
              validations.map((validation: any) => (
                <TableRow key={validation.id}>
                  {tableMetaData?.rows.map(
                    (row: { id: number; key: string }) => (
                      <TableCell key={row.id}>{validation[row.key]}</TableCell>
                    )
                  )}
                  <TableCell width={130}>
                    <IconButton
                      color="info"
                      aria-label="edit"
                      onClick={() => {
                        setCurrentItem(validation);
                        setCurrentTab("edit");
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      aria-label="delete"
                      onClick={() => {
                        onDeleteRule(validation.id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      aria-label="add"
                      onClick={() => {
                        setCurrentItem(null);
                        setCurrentTab("create");
                      }}
                    >
                      <Add />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key={"no-data"}>
                <TableCell
                  colSpan={4}
                  component="th"
                  scope="row"
                  align="center"
                >
                  No data found
                </TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    aria-label="add"
                    onClick={() => {
                      setCurrentItem(null);
                      setCurrentTab("create");
                    }}
                  >
                    <Add />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={12} textAlign="right" style={{ marginTop: 20 }}>
          <Button variant="text" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
