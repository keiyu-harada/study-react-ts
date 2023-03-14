import Grid from "@mui/material/Unstable_Grid2";

export default function Footer() {
  return(
    <footer className="page-footer teal lighten-2">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h5>書籍管理システム</h5>
        <h4>© 2023 Copyright 書籍管理システム</h4>
      </Grid>
    </footer>
  )
}