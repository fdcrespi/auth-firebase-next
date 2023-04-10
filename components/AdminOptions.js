import { Button, ListItem } from "@mui/material";
import Link from "next/link";


export default function AdminOptions() {

  const handleClick = () => {
    console.log("Click");
  }

  return (
  <ListItem disablePadding sx={{justifyContent: 'center'}}>
    <Link href="/">
      <Button sx={{ color: '#000' }} onClick={handleClick}>
        Administrar
      </Button>
    </Link>
  </ListItem>
  )
}