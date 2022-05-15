import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SwitchInput from "Components/SwitchInput/SwitchInput";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import PieceContext from "Services/PieceContext";
import PieceForm from "../PieceForm/PieceForm";
import CenteredModal from "Components/Modal/CenteredModal";
import { useNavigate } from "react-router-dom";

export default function ListPieces() {
  const { isLoading, pieces, getPieces, removePiece } =
    React.useContext(PieceContext);

  const [modalOpen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (pieces.length === 0) {
      getPieces();
    }
  }, []);

  return (
    <>
      <CenteredModal
        title="Ajout Piece"
        isOpen={modalOpen}
        onHide={() => setModalOpen(false)}
      >
        <PieceForm marginTop="0px" />
      </CenteredModal>

      <h1
        style={{
          width: "100%",
          textAlign: "center",
          margin: "2rem",
          color: "#797ef6",
        }}
      >
        PIECES
      </h1>

      <Button
        startIcon={<AddIcon />}
        onClick={() => setModalOpen(true)}
        aria-label="add"
        color="primary"
        style={{ margin: "10px" }}
        size="medium"
      >
        Ajout
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Libele</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">A vendre</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Date création</TableCell>
              <TableCell align="right">Période</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <></>
            ) : (
              pieces.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.libele}
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">
                    <SwitchInput checked={row.a_vendre} disabled={true} />
                  </TableCell>
                  <TableCell align="center">{row.stock}</TableCell>
                  <TableCell align="center">
                    {row.date_creation.substring(0, 10)}
                  </TableCell>
                  <TableCell align="right">{row.periode}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconButton
                        onClick={() => navigate(row._id)}
                        aria-label="edit"
                        color="warning"
                      >
                        <EditOutlinedIcon />
                      </IconButton>

                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          removePiece(row._id);
                        }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
