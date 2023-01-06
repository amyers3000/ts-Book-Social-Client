import { Container, Box, Avatar, Typography, TextField, Button, Grid, Alert } from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser } from '../../store/userSlice';
import { Credentials } from '../../App/models/user';



const LogIn = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { token, error, status } = useAppSelector((state) => state.authenticate)
    const [credentials, setCredentials] = useState<Credentials>({
        username: '',
        password: ''
    })
    
    useEffect(() => {
        if(token || localStorage.getItem('token')){
            navigate('/home', {replace: true})
        }
        // eslint-disable-next-line
    }, [])
   

  

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(loginUser(credentials))
        setTimeout(() => navigate("/home", {replace: true}), 300)
        

    }

    return (

        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {status === "rejected" && <Alert severity='error'>
                    {`${error}`}
                </Alert>}
                <Box component="form" onSubmit={(e) => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Username"
                        label="Username"
                        name="Username"
                        value={credentials.username}
                        onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={credentials.password}
                        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/signup">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>

    )
}

export default LogIn


