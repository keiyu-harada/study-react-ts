import Header from "./Header";
import {SubmitHandler, useForm} from "react-hook-form";
import {Book} from "../models/Book";
import {addBook} from "../api";
import {useState} from "react";
import TextField from "@mui/material/TextField";
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
          setMessage(<Alert severity="info">データの登録に成功しました</Alert>);
        }
      })
      .catch((e) => {
        setMessage(<Alert severity="error">データの登録に失敗しました" {e.message}</Alert>)
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
              <TextField
                fullWidth
                {...register("name", {required: true})}
                variant="standard"
                InputLabelProps={{ shrink: true }}
                label="書籍名*"
                error={errors.name && true}
                helperText={errors.name && true ? "1文字以上入力してください" : ""}
              />
            </div>
            <br />
            <div>
              <TextField
                fullWidth
                {...register("author")}
                variant="standard"
                InputLabelProps={{ shrink: true }}
                label="著者名"
              />
            </div>
            <br />
            <div>
              <TextField
                fullWidth
                {...register("published_date")}
                type="date"
                variant="standard"
                InputLabelProps={{ shrink: true }}
                label="発行日"
              />
            </div>
            <br />
            <div>
              <TextField
                fullWidth
                {...register("description")}
                variant="standard"
                InputLabelProps={{ shrink: true }}
                label="説明"
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
    </div>
  )
}