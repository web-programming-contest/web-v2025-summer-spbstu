import React, { useRef, useState } from "react";
import "./Modal.css";

function Modal({ book, onClose }) {
  const modalRef = useRef();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const coverImage = book.cover_large || book.cover;

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal" ref={modalRef}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        {isImageLoading && <div className="modal-spinner"></div>}
        <img
          src={coverImage}
          alt={book.title}
          className="modal-cover"
          onLoad={handleImageLoad}
          style={{ display: isImageLoading ? "none" : "inline" }}
        />
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
        <p>{book.description}</p>
      </div>
    </div>
  );
}

export default Modal;
