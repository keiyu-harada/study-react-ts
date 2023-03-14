import {useNavigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Toolbar} from "@mui/material";
import Link from '@mui/material/Link';

export default function Header() {
  const navigate = useNavigate();

  const onClickRegisterPage = () => {
    navigate("/register")
  }

  const onClickHome = () => {
    navigate("/")
  }

  return(
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link
              href="/"
              color="inherit"
              underline="none"
              sx={{ flexGrow: 1}}
            >
              書籍管理システム
            </Link>
            <Button color="inherit" onClick={onClickRegisterPage}>新規作成</Button>
            <Button color="inherit" onClick={onClickHome}>書籍一覧</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  )
}