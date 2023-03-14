import Header from "./Header";
import Footer from "./Footer";
import {SubmitHandler, useForm} from "react-hook-form";
import {Book} from "../models/Book";
import {addBook} from "../api";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';

export default function RegisterPage(){
  const [message, setMessage] = useState<JSX.Element>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Book>();

  const onClickAdd: SubmitHandler<Book> = (book) => {
    addBook(book)
      .then((code) => {
        if(code === 200){
          reset();
          setMessage(<Alert severity="info">登録に成功しました</Alert>);
        }
      })
      .catch((e) => {
        console.error(e.message)
        setMessage(<Alert severity="error">登録に失敗しました</Alert>)
      })
  }

  return (
    <div>
      <Header />
      <br />
      <Grid container>
        <Grid xs />
        <Grid xs={9}>
          {message}
          <br/>
          <form onSubmit={handleSubmit(onClickAdd)}>
            <div>
              <Typography variant="body1" gutterBottom>書籍名 *</Typography>
              <TextField
                fullWidth
                {...register("name", {required: true})}
                variant="standard"
              />
            </div>
            <br />
            <div>
              <Typography variant="body1" gutterBottom>著者名</Typography>
              <TextField
                fullWidth
                {...register("author")}
                variant="standard"
              />
            </div>
            <br />
            <div>
              <Typography variant="body1" gutterBottom>発行日</Typography>
              <TextField
                fullWidth
                {...register("published_date")}
                type="date"
                variant="standard"
              />
            </div>
            <br />
            <div>
              <Typography variant="body1" gutterBottom>説明</Typography>
              <TextField
                fullWidth
                {...register("description")}
                variant="standard"
              />
            </div>
            <br />
            <Button type="submit" size="large" variant="contained">
              登録
            </Button>
          </form>
        </Grid>
        <Grid xs />
      </Grid>
      <Footer></Footer>
    </div>
  )
}