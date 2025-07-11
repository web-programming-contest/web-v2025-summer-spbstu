export default function BookCard({book}){
    const {cover, title, rating, description, price} = book;
    return(
        <div className='bookCard'>
            <img className='bookCover' src={cover} alt="book cover"></img>
            <div className="bookInfo">
                <h3>{title}</h3>
                <p><b>Рейтинг:</b> {rating}</p>
                <p><b>Описание:</b> {description}</p>
                <p><b>Стоимость:</b> {price} руб.</p>
            </div>
        </div>
    );
}