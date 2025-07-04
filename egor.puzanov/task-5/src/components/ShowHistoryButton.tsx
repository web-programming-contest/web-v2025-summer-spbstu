export function ShowHistoryButton({ref}: {ref: React.RefObject<HTMLParagraphElement | null>}) {

    return (
        <button
        className="historyButton" 
        onClick={() => showDiv(ref)}
        >
        <img src="/history.svg"></img>
        </button>
    )
}

function showDiv(ref: React.RefObject<HTMLParagraphElement | null>) {
    if(ref.current){
        ref.current.classList.toggle("clicked");
    }
}