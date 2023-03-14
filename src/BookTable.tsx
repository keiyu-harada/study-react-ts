import React, {useEffect, useState} from "react";
import {Book} from "./models/Book";
import {deleteBook, getBooks} from "./api";
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

export default function BookTable() {
  const [books, setBooks] = useState<[]|Book[]>([]);
  const navigate = useNavigate();

  function getBookList(): void {
    getBooks()
      .then((bookList) => {
        setBooks(bookList);
      })
      .catch((e) => {
        console.log(e.message);
      })
  }

  function onClickDelete(id: string) {
    deleteBook(id)
      .then((res) => {
        console.log(res)
        getBookList();
      })
  }

  const onClickDetailPage = (bookId: string) => {
    navigate(`details/${bookId}`)
  }

  useEffect(() => {
    getBookList();
  }, []);

  return (
    <TableContainer component={Paper}>
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