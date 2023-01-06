import { Container, Box, Avatar, Typography, Grid, TextField, Button, Alert } from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LockIcon from '@mui/icons-material/Lock';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { signupUser } from "../../store/userSlice";
import { Sign } from "../../App/models/user";


const SignUp = () => {
    
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { status, error, token } = useAppSelector((state) => state.authenticate)
    const [credentials, setCredentials] = useState<Sign>({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        state: '',
        city: ''
    })



    
    useEffect(() => {
        if (token || localStorage.getItem('token')) {
            navigate('/home', { replace: true })
        }
        // eslint-disable-next-line
    }, [])


    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(signupUser(credentials))
        setTimeout(() => navigate("/", {replace: true}), 300)

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
                    Sign up
                </Typography>
                {status === "rejected" && <Alert severity='error'>
                    {`${error}`}
                </Alert>}

                <Box component="form" noValidate onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                value={credentials.firstName}
                                onChange={e => setCredentials({ ...credentials, firstName: e.target.value })}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={credentials.lastName}
                                onChange={e => setCredentials({ ...credentials, lastName: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={credentials.username}
                                onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={credentials.password}
                                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="city"
                                required
                                fullWidth
                                id="city"
                                label="City"
                                autoFocus
                                value={credentials.city}
                                onChange={e => setCredentials({ ...credentials, city: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="state"
                                label="State"
                                name="state"
                                value={credentials.state}
                                onChange={e => setCredentials({ ...credentials, state: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>

    )
}


export default SignUp


