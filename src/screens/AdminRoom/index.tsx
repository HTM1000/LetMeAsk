import { useHistory, useParams } from 'react-router-dom';

import LogoSvg from '../../assets/logo.svg';
import DeleteSvg from '../../assets/delete.svg';
import CheckSvg from '../../assets/check.svg';
import AnswerSvg from '../../assets/answer.svg';

import { Button } from '../../components/Button';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';
//import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';

import './styles.scss';
import { database } from '../../services/firebase';

interface RoomsParams {
  id: string;
}

export function AdminRoom(){
  //const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomsParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string){
    if(window.confirm('Tem certeza que deseja excluir esta pergunta?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoSvg} alt="LetMeAsk" />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala { title }</h1>
          { questions.length > 0 && <span>{ questions.length } pergunta(s)</span>}
        </div>

        <div className="question-list">
        { questions.map(question => {
          return (
            <Question
            key={question.id}
            content={question.content}
            author={question.author}
            isAnswered={question.isAnswered}
            isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                 <button 
                 type="button"
                 onClick={() => handleCheckQuestionAsAnswered(question.id)}
                 >
                 <img src={CheckSvg} alt="Icone de marcar perguntar como respondida" />
 
                 </button>
 
                 <button 
                  type="button"
                  onClick={() => handleHighlightQuestion(question.id)}
                 >
                  <img src={AnswerSvg} alt="Icone de dar destaque à pergunta" />
  
                 </button>
                </>
              )}
              <button 
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={DeleteSvg} alt="Icone de deletar pergunta" />

              </button>

            </Question>
          )
        })}
        </div>
      </main>
    </div>
  )
}