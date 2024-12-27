
'use client';

import { useForm } from 'react-hook-form';
import { Input, FormControl, FormLabel, Button, FormErrorMessage } from '@chakra-ui/react';

interface FormData {
  username: string;
  email: string;
}

export default function FormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json)).
      finally(() => {
        setValue('username', '')
        setValue('email', '')
      });

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.username}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          placeholder="Enter your username"
          {...register('username', { required: 'Username is required' })}
        />
        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.email} mt={4}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>

      <Button type="submit" mt={4} colorScheme="teal">
        Submit
      </Button>
    </form>
  );
}
