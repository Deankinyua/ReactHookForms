import Form, { formData } from './Components/Form';
import './App.css';

function App() {
  const onSubmit = async (data: formData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };
  return (
    <>
      <Form onSubmit={onSubmit}></Form>
    </>
  );
}

export default App;
