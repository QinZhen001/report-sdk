import { jsx, css, Global, ClassNames } from '@emotion/react';

const anotherStyle = css({
  textDecoration: 'underline',
});

const AnotherComponent = () => (
  <div css={{ textDecoration: 'underline' }} className="saasd">
    Some text with an underline.
  </div>
);

function App() {
  return (
    <div className="App">
      111
      <AnotherComponent></AnotherComponent>
    </div>
  );
}

export default App;
