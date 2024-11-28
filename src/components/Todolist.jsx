import React, { useState } from "react";
import Modal from "./Modal";

export default function Todolist() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [listJob, setListJob] = useState(() => {
    const jobLocal = JSON.parse(localStorage.getItem("jobs")) || [];

    return jobLocal;
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  //   Validate dữ liệu đầu vào
  const validateData = (value) => {
    if (!value) {
      setError("Tên công việc không được để trống");
    } else {
      setError("");
    }
  };

  // Lấy giá trị bên trong input
  const handleChangeInput = (event) => {
    setInputValue(event.target.value);

    // Validate dữ liệu
    validateData(event.target.value);
  };

  // Hàm lưu dữ liệu lên local và cập nhật lại dữ liệu cho component
  const saveData = (key, value) => {
    // Cập nhật dữ liệu vào state của component
    setListJob(value);

    // Lưu dữ liệu lên localStorage
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Submit Form
  const handleSubmit = (e) => {
    // Ngăn chặn sự kiện load lại trang khi submit form
    e.preventDefault();

    // Validate dữ liệu
    validateData(inputValue);

    if (inputValue) {
      // Tiến hành thêm mới công việc vào mảng
      // id, title, status
      const newJob = {
        id: Math.ceil(Math.random() * 100000),
        title: inputValue,
        status: false,
      };

      //   Thêm công việc mới vào trong mảng
      //   spead operator
      const jobClone = [...listJob, newJob];

      saveData("jobs", jobClone);

      //   Clear giá trị trong input
      setInputValue("");
    }
  };

  //   Cập nhật trạng thái công việc
  const handleChangeStatus = (id) => {
    //   Cập nhật lại công việc trong mảng theo id
    // Bước 1: Tìm vị trí của công việc trong mảng cần cập nhật
    const findIndexJob = listJob.findIndex((job) => job.id === id);

    // Bước 2: Từ vị trí, truy cập để lấy ra đối tượng công việc
    if (findIndexJob !== -1) {
      // Bước 3: Từ đối tượng job, truy cập vào trường status để cập nhật lại
      listJob[findIndexJob].status = !listJob[findIndexJob].status;

      //  Clone ra một mảng mới
      const cloneJobs = [...listJob];

      // Bước 4: Lưu dữ liệu
      saveData("jobs", cloneJobs);
    }
  };

  //   Hàm mở modal xác nhận xóa
  const handleShowModal = (id) => {
    // Mở modal
    setIsShowModal(true);

    // Lấy id của công việc cần xóa
    setIdDelete(id);
  };

  // Đóng modal xác nhận xóa
  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  // Hàm xác nhận xóa
  const handleConfirmDelete = () => {
    // Lọc ra các bản ghi có id khác với id cần xóa
    const filterJobs = listJob.filter((job) => job.id !== idDelete);

    saveData("jobs", filterJobs);

    // Đóng modal xác nhận xóa
    handleCloseModal();

    // Reset lại Id của công việc cần xóa
    setIdDelete(null);
  };
  return (
    <>
      {/* Modal xác nhận xóa */}
      <Modal
        title="Xác nhận xóa"
        content="Bạn có muốn xóa công việc này không?"
        cancelText="Hủy"
        confirmText="Xóa"
        open={isShowModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <form
                    onSubmit={handleSubmit}
                    className="d-flex justify-content-center align-items-center mb-4"
                  >
                    <div className="form-outline flex-fill">
                      <input
                        onBlur={handleChangeInput}
                        value={inputValue}
                        placeholder="Nhập nội dung công việc"
                        onChange={handleChangeInput}
                        type="text"
                        id="form2"
                        className="w-100"
                      />
                    </div>
                    <button type="submit" className="btn btn-info ms-2">
                      Thêm
                    </button>
                  </form>
                  {error && (
                    <p style={{ color: "red", fontSize: 12 }}>{error}</p>
                  )}

                  {/* Tabs navs */}
                  <ul className="nav nav-tabs mb-4 pb-2">
                    <li className="nav-item" role="presentation">
                      <a className="nav-link active">Tất cả</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a className="nav-link">Đã hoàn thành</a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a className="nav-link">Chưa hoàn thành</a>
                    </li>
                  </ul>
                  {/* Tabs navs */}
                  {/* Tabs content */}
                  <div className="tab-content" id="ex1-content">
                    <div className="tab-pane fade show active">
                      <ul className="list-group mb-0">
                        {listJob.length === 0 ? (
                          <h4 className="text-center">
                            Bạn chưa có công việc nào
                          </h4>
                        ) : (
                          <>
                            {listJob.map((item) => (
                              <li
                                key={item.id}
                                className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                                style={{ backgroundColor: "#f4f6f7" }}
                              >
                                <div>
                                  <input
                                    onChange={() => handleChangeStatus(item.id)}
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    checked={item.status}
                                  />
                                  {item.status ? (
                                    <s>{item.title}</s>
                                  ) : (
                                    <span>{item.title}</span>
                                  )}
                                </div>
                                <div className="d-flex gap-3">
                                  <i className="fas fa-pen-to-square text-warning" />
                                  <i
                                    onClick={() => handleShowModal(item.id)}
                                    className="far fa-trash-can text-danger"
                                  />
                                </div>
                              </li>
                            ))}
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal cảnh báo lỗi */}
      <div className="overlay" hidden={true}>
        <div className="modal-custom">
          <div className="modal-header-custom">
            <h5>Cảnh báo</h5>
            <i className="fas fa-xmark" />
          </div>
          <div className="modal-body-custom">
            <p>Tên công việc không được phép để trống.</p>
          </div>
          <div className="modal-footer-footer">
            <button className="btn btn-light">Đóng</button>
          </div>
        </div>
      </div>
    </>
  );
}
