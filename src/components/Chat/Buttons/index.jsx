import * as Icon from 'react-bootstrap-icons';

const Buttons = ({ downloadContent }) => {
  return (
    <div className="buttons text-end mt-2 mb-3 me-2">
      <button
        className="btn btn-sm bg-black text-white"
        onClick={downloadContent}
      >
        DESCARGAR CONVERSACIÓN <Icon.Download />
      </button>
    </div>
  );
};

export default Buttons;
