import CopySvg from '../../assets/copy.svg';

import './styles.scss';

interface RoomCodeProps {
  code: string;
}

export function RoomCode({ code }: RoomCodeProps){
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(code)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={CopySvg} alt="Copy room code" />
      </div>
      <span>Sala #{code}</span>
    </button>
  )
}