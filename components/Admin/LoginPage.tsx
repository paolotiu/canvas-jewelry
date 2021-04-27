import Input from '@components/General/Input';
import { useForm } from '@utils/useForm';

const LoginPage = () => {
  const { inputs } = useForm({
    hello: 'hey',
  });
  return (
    <div>
      <form action="POST">
        <Input type="text" value={inputs.hello} />
      </form>
    </div>
  );
};

export default LoginPage;
