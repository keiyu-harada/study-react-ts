import {useParams} from "react-router-dom";
import {getBook, updateBook} from "./api";
import {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Book, toOnlyDate} from "./models/Book";
import {SubmitHandler, useForm} from "react-hook-form";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
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
  } = useForm<Book>();

  useEffect(() => {
    getBook(bookId)
      .then((res: Book) => {
        oldBook = res;
        setValue("name", res.name);
        res.author !== null ? setValue("author", res.author) : setValue("author", "");
        res.published_date !== null ? setValue("published_date", toOnlyDate(res.published_date)) : setValue("published_date", "0000-00-00");
        res.description !== null ? setValue("description", res.description) : setValue("description", "");
      })
      .catch((e) => {
        console.log(e);
        setMessage(<Alert severity="error">データの取得に失敗しました</Alert>);
      })
  }, []);

  const onClickUpdate: SubmitHandler<Book> = (newBook: Book) => {
    console.log(newBook)
    console.log(oldBook)
    updateBook(newBook, oldBook, bookId)
      .then((code) => {
        if(code === 200){
          setMessage(<Alert severity="info">更新に成功しました</Alert>);
        }
      })
      .catch((e) => {
        console.error(e.message)
        setMessage(<Alert severity="error">更新に失敗しました</Alert>);
      })
  }

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
              <Typography variant="body1" gutterBottom>書籍名 *</Typography>
              <TextField
                fullWidth
                {...register("name", {minLength: 1})}
                onChange={(e) => setValue("name", e.target.value)}
                variant="standard"
              />
              {errors.name && (
                <span style={{ color: "red" }}>1文字以上入力してください。</span>
              )}
            </div>
            <br />
            <div>
              <Typography variant="body1" gutterBottom>著者名</Typography>
              <TextField
                fullWidth
                {...register("author")}
                onChange={(e) => setValue("author", e.target.value)}
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
                onChange={(e) => setValue("published_date", e.target.value)}
                variant="standard"
              />
            </div>
            <br />
            <div>
              <Typography variant="body1" gutterBottom>説明</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                {...register("description")}
                onChange={(e) => setValue("description", e.target.value)}
                variant="standard"
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
      <Footer></Footer>
    </div>
  )
}