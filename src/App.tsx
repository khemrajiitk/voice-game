import './App.css';
import { GameComponent } from './component/game.component';
import { useHttpIntercepter } from './util/http.intercepter';

export const App = () => {
  useHttpIntercepter()
  return (
    <GameComponent />
  );
}
