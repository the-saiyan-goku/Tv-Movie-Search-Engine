import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    flexGrow: '1',
    padding: '2rem',
    marginLeft: '240px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '54px',
    },
  },
  toolkit: {
    height: '70px',
  },
}));
