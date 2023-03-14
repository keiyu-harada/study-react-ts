import React, {useEffect, useState} from "react";
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
  // Errorメッセージを出す用
  const [message, setMessage] = useState<JSX.Element>();
  // ページ切り替える時に使用
  const navigate = useNavigate();

  function onClickDelete(id: string) {
    deleteBook(id)
      .then((res) => {
        console.log(res)
        setBookTable();
      })
      .catch((e) => {
        setMessage(<Alert severity="error">データの削除に失敗しました: {e.message}</Alert>)
      })
  }

  function setBookTable() {
    getBooks()
      .then((bookList) => {
        setBooks(bookList);
      })
      .catch((e) => {
        setMessage(<Alert severity="error">データの削除に失敗しました: {e.message}</Alert>)
      })
  }

  const onClickDetailPage = (bookId: string) => {
    navigate(`details/${bookId}`)
  }

  /*
   useEffectを使用しないと無限にAPIを叩く
    第二引数がないと再描画時に実行し続けてしまう
   */
  useEffect(()=> {
    setBookTable();
  }, []);

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