import {useParams} from "react-router-dom";
import {getBook, updateBook} from "../api";
import {useState} from "react";
import Header from "./Header";
import {Book, toOnlyDate} from "../models/Book";
import {SubmitHandler, useForm} from "react-hook-form";
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';

export default function DetailsPage() {
  const params = useParams().id;
  const bookId = params === void 0 ? "" : params;
  const [message, setMessage] = useState<JSX.Element>();
  let oldBook: Book;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Book>({
  });

  const onClickUpdate: SubmitHandler<Book> = (newBook: Book) => {
    updateBook(newBook, oldBook, bookId)
      .then((code) => {
        if(code === 200){
          setMessage(<Alert severity="info">データの更新に成功しました</Alert>);
        }
      })
      .catch((e) => {
        setMessage(<Alert severity="error">データの更新に失敗しました: {e.message}</Alert>);
      })
  }

  getBook(bookId)
    .then((res: Book) => {
      oldBook = res;
      setValue("name", res.name);
      res.author !== null ? setValue("author", res.author) : setValue("author", "");
      res.published_date !== null ? setValue("published_date", toOnlyDate(res.published_date)) : setValue("published_date", "0000-00-00");
      res.description !== null ? setValue("description", res.description) : setValue("description", "");
    })
    .catch((e) => {
      setMessage(<Alert severity="error">データの取得に失敗しました: {e.message}</Alert>);
    })

  console.log(errors.name?.message)

  return (
    <div>
      <Header></Header>
      <br />
      <Grid container>
        <Grid xs />
        <Grid xs={9}>
          {message}
          <br/>
          <form onSubmit={handleSubmit(onClickUpdate)}>
            <div>
              <TextField
                fullWidth
                {...register("name", {required: true})}
                onChange={(e) => setValue("name", e.target.value)}
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
                onChange={(e) => setValue("author", e.target.value)}
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
                onChange={(e) => setValue("published_date", e.target.value)}
                variant="standard"
                InputLabelProps={{ shrink: true }}
                label="発行日"
              />
            </div>
            <br />
            <div>
              <TextField
                fullWidth
                multiline
                rows={4}
                {...register("description")}
                onChange={(e) => setValue("description", e.target.value)}
                variant="standard"
                InputLabelProps={{ shrink: true }}
                label="説明"
              />
            </div>
            <br />
            <Button type="submit" size="large" variant="contained">
              更新
            </Button>
          </form>
        </Grid>
        <Grid xs />
      </Grid>
    </div>
  )
}