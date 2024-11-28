import React from "react";

export default function Modal({
  title = "Tiêu đề",
  content = "Nội dung modal",
  cancelText = "Hủy",
  confirmText = "Xác nhận",
  open = false,
  onClose,
  onConfirm,
}) {
  return (
    <>
      {/* Modal xác nhận xóa */}
      {open && (
        <div style={{ zIndex: 100 }} className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>{title}</h5>
              <i onClick={onClose} className="fas fa-xmark" />
            </div>
            <div className="modal-body-custom">
              <p>{content}</p>
            </div>
            <div className="modal-footer-footer">
              <button onClick={onClose} className="btn btn-light">
                {cancelText}
              </button>
              <button onClick={onConfirm} className="btn btn-danger">
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
