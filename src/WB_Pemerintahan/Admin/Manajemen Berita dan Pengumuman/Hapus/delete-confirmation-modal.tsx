import { Component, createSignal } from 'solid-js';
import './modal-css.css'

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemType: string;
}

const DeleteConfirmationModal: Component<DeleteConfirmationModalProps> = (props) => {
  return (
    <div class={`modal-confirm ${props.isOpen ? 'open' : ''}`}>
      <div class="modal-content-confirm">
        <p>Anda yakin akan menghapus {props.itemType}?</p>
        <div class="modal-actions">
          <button class="batal-btn" onClick={props.onClose}>Batalkan</button>
          <button class="hapus-btn" onClick={props.onConfirm}>Hapus</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
