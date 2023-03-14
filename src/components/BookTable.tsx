import React, {useState} from "react";
import {Book} from "../models/Book";
import {deleteBook, getBooks} from "../api";
import {useNavigate} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import Alert from "@mui/material/Alert";

export default function BookTable() {
  const [books, setBooks] = useState<[]|Book[]>([]);
  const [message, setMessage] = useState<JSX.Element>();
  const navigate = useNavigate();

  function onClickDelete(id: string) {
    deleteBook(id)
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        setMessage(<Alert severity="error">データの削除に失敗しました: {e.message}</Alert>)
      })
  }

  const onClickDetailPage = (bookId: string) => {
    navigate(`details/${bookId}`)
  }

  getBooks()
    .then((bookList) => {
      setBooks(bookList);
    })
    .catch((e) => {
      setMessage(<Alert severity="error">データの削除に失敗しました: {e.message}</Alert>)
    })

  return (
    <TableContainer component={Paper}>
      {message}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>タイトル</TableCell>
            <TableCell>著者</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.name}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  <IconButton color="inherit" onClick={() => onClickDetailPage(book.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => onClickDelete(book.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );

}