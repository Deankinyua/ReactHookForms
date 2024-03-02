import { Input, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type TProps = {
  onSubmit: (data: formData) => void;
};

const passwordValidationSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  .regex(/\d/, { message: 'Password must contain at least one number' })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'Password must contain at least one special character',
  });

const schema = z.object({
  name: z
    .string()
    .min(6, { message: 'The name must be at least 6 characters long' }),
  email: z.string().email({ message: 'Please enter a valid Email' }),
  password: passwordValidationSchema,
});

export type formData = z.infer<typeof schema>;

const Form = ({ onSubmit }: TProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<formData>({ resolver: zodResolver(schema) });
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <Input {...register('name')} id="name" variant="outline" type="text" />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
        <label htmlFor="email">Email</label>
        <Input
          {...register('email')}
          id="email"
          variant="outline"
          type="text"
        />{' '}
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
        <label htmlFor="password">Password</label>
        <Input
          {...register('password')}
          id="password"
          variant="outline"
          type="password"
        />{' '}
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
        <Button colorScheme="teal" variant="solid" type="submit" mt={2}>
          Submit
        </Button>
        {isSubmitted && <p>Thank you for submitting the form!</p>}
      </form>
    </>
  );
};

export default Form;
