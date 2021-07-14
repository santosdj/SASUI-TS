import { useAuth } from '../hooks/useAuth';
import { Redirect, useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export default function SignIn() {
  const { signInWithAD, accountInfo } = useAuth();
  const history = useHistory();

  async function mySignIn() {
    const accessToken = localStorage.getItem('@AzureAd:accessToken');

    if (!accessToken) {
      console.log('logando');
      await signInWithAD();
    }
    history.replace('/home');
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
    })
  );

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {accountInfo?.isAuthenticated ? <Redirect to="/home" /> : ''}
      <main className={classes.content}>
        Please, sign in
        <button onClick={mySignIn}>Entrar</button>
      </main>
    </div>
  );
}
