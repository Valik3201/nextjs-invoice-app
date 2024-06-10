import Modal from "./Modal";

export default function ConfirmDeletionModal({
  handleConfirm,
  id,
}: {
  handleConfirm: () => void;
  id: string;
}) {
  return (
    <Modal handleConfirm={handleConfirm} trigger="Delete">
      <Modal.Header>Confirm Deletion</Modal.Header>
      <Modal.Body>
        Are you sure you want to delete invoice #{id}? This action cannot be
        undone.
      </Modal.Body>

      <div className="flex gap-2 justify-end">
        <Modal.DiscardBtn>Cancel</Modal.DiscardBtn>
        <Modal.ConfirmBtn>Delete</Modal.ConfirmBtn>
      </div>
    </Modal>
  );
}
