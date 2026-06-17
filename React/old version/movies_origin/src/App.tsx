import { FunctionComponent } from 'react';
import styles,{ cssSetPropertys } from './styles' ;
import Main from './component/Main/Main';

const { Show }:cssSetPropertys = styles

const App:FunctionComponent<{}> = ():JSX.Element => (
  <div className="App">
    <Show>
      <Main />
    </Show>
  </div>
)

export default App;
