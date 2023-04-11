import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Progress() {
  return (
    <Box sx={{ width: '100%', height: '100%', backgroundColor: 'rgb(0,0,0,0.4)', overflow: 'hidden', position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center', top: 0, left: 0, zIndex: 9999 }}>
      <CircularProgress color="success" />
    </Box>
  );
}
