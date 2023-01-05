import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid, Alert } from '@mui/material'
import { FormEvent, useState } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom'
import agent, { Credentials, Errors } from '../../App/lib';



const LogIn = () => {
    const [credentials, setCredentials] = useState<Credentials>({
        username: '',
        password: ''
    })
    const [error, setError] = useState<Errors | null>(null)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        agent.User.login(credentials)
            .catch(err => {
                console.log(err)
                setError({ code: err.response.status, message: err.response.data.message })
            })

    }

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
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
                {!!error && <Alert severity='error'>
                    {`${error.code} : ${error.message}`}
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