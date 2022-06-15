import { useHistory } from "react-router-dom";

import { Button } from "../../components/Button";

import IllustrationSvg from "../../assets/illustration.svg";
import LogoSvg from "../../assets/logo.svg";
import GooogleSvg from "../../assets/google-icon.svg";

import './styles.scss';
import { useAuth } from "../../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../../services/firebase";

export function Home(){
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom(){
    if(!user){
     await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event : FormEvent){
    event.preventDefault();

    if(roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if(!roomRef.exists()){
      alert('Room is not exists');
      return;
    }

    if(roomRef.val().endedAt) {
      alert('Room already closed');
      return;
    }
    
    history.push(`/rooms/${roomCode}`);
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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={GooogleSvg} alt='Logo do Google' />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o codigo da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>

        </div>
      </main>
    </div>
  )
}