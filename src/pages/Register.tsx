import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {FormControl, FormLabel, Stack, TextField, Typography} from "@mui/material";
import {Controller, Form, useForm} from "react-hook-form";
import Button from "@mui/material/Button";

type FormControlType = {
    email: string
    username: string
    password: string
    firstName: string
    lastName: string
    confirmPassword: string
}

function Register() {
    const {
        register,
        watch,
        getValues,
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<FormControlType>({
        defaultValues: {email: "", username: "", password: "", firstName: "", lastName: "", confirmPassword: ""}
    })


    const currentValues = watch()

    const handleRegister = useCallback(async (data: FormControlType) => {
        console.log('data react form', data)
        // const response = await registerMutation({variables:{email:data.email, username:data.username, password:data.password}})
    }, [currentValues])

    return (
        <Stack>
            <Typography component={'h1'}>Sign up</Typography>
            {/*<Form>*/}
            <Stack component={"form"} onSubmit={handleSubmit(handleRegister)}>
                <Controller
                    name="username"
                    control={control}
                    rules={{
                        required: 'User name is required',
                        validate: value => value !== "admin" || "Nice try!"
                    }}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="User name"
                            variant="standard"
                            fullWidth
                            error={!!errors.username}
                            helperText={errors.username ? errors.username.message : ''}
                            margin="normal"
                        />
                    )}
                />
                {errors.username && errors.username.message}


                <Controller
                    name="firstName"
                    control={control}
                    rules={{required: 'First name is required'}}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="First Name"
                            defaultValue={"joe"}
                            variant="standard"
                            fullWidth
                            error={!!errors.firstName}
                            helperText={errors.firstName ? errors.firstName.message : ''}
                            margin="normal"
                        />
                    )}
                />

                <Controller
                    name="lastName"
                    control={control}
                    rules={{required: 'Last name is required'}}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Last Name"
                            defaultValue={"doe"}
                            variant="standard"
                            fullWidth
                            error={!!errors.lastName}
                            helperText={errors.lastName ? errors.lastName.message : ''}
                            margin="normal"
                        />
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Invalid email address',
                        },
                    }}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : ''}
                            margin="normal"
                        />
                    )}
                />
                {errors.email && errors.email.message}


                <Controller
                    name="password"
                    control={control}
                    rules={{required: 'Password is required', minLength: 10}}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Password"
                            type="password"
                            variant="standard"
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ''}
                            margin="normal"
                        />
                    )}
                />


                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register</Button>
            </Stack>
        </Stack>
    );
}

export default Register;