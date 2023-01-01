import { jsx, css, Global, ClassNames } from '@emotion/react';
import ErrorStackParser from 'error-stack-parser';

const anotherStyle = css({
  textDecoration: 'underline',
});

const AnotherComponent = () => (
  <div css={{ textDecoration: 'underline' }} className="saasd">
    Some text with an underline.
  </div>
);

const TestComponent = () => {
  const onClick = () => {
    console.log('click');
    const err = new Error('test');
    const res = ErrorStackParser.parse(err);
    console.log('res', res);
    throw err;
  };

  return <div onClick={onClick}>test</div>;
};

function App() {
  return (
    <div className="App">
      <AnotherComponent></AnotherComponent>
      <TestComponent></TestComponent>
    </div>
  );
}

export default App;
