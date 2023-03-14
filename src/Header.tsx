import {useNavigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Toolbar} from "@mui/material";

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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              書籍管理システム
            </Typography>
            <Button color="inherit" onClick={onClickRegisterPage}>新規作成</Button>
            <Button color="inherit" onClick={onClickHome}>書籍一覧</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  )
}