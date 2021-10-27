import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import Close from "../media/close-black.svg";
import { deleteDispatch, deleteSlice } from "../store/deleteSongSlice";
import { uiDispatch, uiSelect } from "../store/uiSlice";
import songService from "../services/songService";

const DeleteModal = () => {
  const showDeleteModal = useSelector(uiSelect.showDeleteModal);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
  });

  function handleClose() {
    return uiDispatch.showDeleteModal(false);
  }

  const id = useSelector(deleteSlice.updateId);

  function handleDelete() {
    uiDispatch.showDeleteModal(false);
    songService
      .deleteSong(id)
      .then((res) => {
        if (res.status === 200) toast.success("Deleted successfully");
        deleteDispatch.updateId("");
      })
      .catch((err) => {
        toast.error(`${err.message}`);
        console.log(err.message);
      });
  }

  function handleEscape(e) {
    if (e.key === "Escape" || e.target.dataset.close === "close") {
      return handleClose();
    }
  }

  if (!showDeleteModal) return null;

  return (
    <Wrapper role="dialog" onClick={handleEscape} data-close="close">
      <div className="container">
        <div className="header">
          <h6>Are you sure?</h6>
          <button autoFocus className="cancel-btn" onClick={handleClose}>
            <img src={Close} alt="" />
          </button>
        </div>
        <p>
          You’re about to permanently delete this song. This action cannot be
          undone
        </p>
        <div className="btn-group">
          <button className="secondary-btn" onClick={handleClose}>
            No, cancel
          </button>
          <button className="danger-btn" onClick={handleDelete}>
            Yes, Delete
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  * {
    margin: 0;
    box-sizing: border-box;
  }

  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
  right: 0px;
  width: 100vw;
  height: 100vh;
  background: rgba(64, 79, 74, 0.5);
  z-index: 100;

  img {
    cursor: pointer;
  }

  .container {
    width: 100%;
    max-width: 464px;
    min-height: 220px;
    background: #FFFFFF;
    box-shadow: 1px 1px 44px rgba(64, 64, 64, 0.5);
    border-radius: 4px;
    padding: 24px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h6 {
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 40px;
    color: #1d1c1d;
  }

  .cancel-btn {
    width: fit-content;
    height: fit-content;
    border: none;
    padding: 0;
    &:focus {
      outline: 2px solid #000;
    }
  }

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 170%;
    color: #616061;
    margin: 8px 0 24px;
  }

  .btn-group {
    display: flex;
    justify-content: flex-end;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 48px;
    max-width: 104px;
    border-radius: 4px;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    background: transparent;
    line-height: 24px;
    outline: none;
    border: none;
    cursor: pointer;
  }

  .secondary-btn {
    color: #00b87c;
    border: 1px solid #00b87c;
    margin-right: 24px;

    &:focus {
      box-shadow: 0px 4px 4px rgba(0, 184, 124, 0.1);
    }
  }

  .danger-btn {
    color: #ffffff;
    background: #f40101;
    &:focus {
      box-shadow: 0px 4px 4px rgba(244, 1, 1, 0.1);
    }
  }

  @media screen and (max-width: 540px) {
    padding: 0 24px;
  }
`;

export default DeleteModal;
