import { FormEvent, useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import IllustrationSvg from "../../assets/illustration.svg";
import LogoSvg from "../../assets/logo.svg";

import { Button } from "../../components/Button";
import { database } from '../../services/firebase';
import { useAuth } from "../../hooks/useAuth";

import './styles.scss';

export function NewRoom(){
  const { user } = useAuth();
  const history = useHistory();

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent ){
    event.preventDefault();

    if(newRoom.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })
    
    history.push(`/rooms/${firebaseRoom.key}`);

  }

  return(
    <div id="page-auth">
      <aside>
        <img src={IllustrationSvg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie Salas de Q&amp;A ao vivo</strong>
        <p>Tire as duvidas de sua audencia em tempo real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={LogoSvg} alt='Logo LetMeAsk' />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da Sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar Sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? 
            <Link to="/"> Clique aqui</Link>
          `</p>
        </div>
      </main>
    </div>
  )
}