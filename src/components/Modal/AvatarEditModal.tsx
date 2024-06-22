import Modal from "./Modal";
import Cropper from "../Cropper/Cropper";
import { ZoomSlider, RotationSlider } from "../Cropper/Sliders";

export default function AvatarEditModal({
  isOpen,
  toggleState,
  handleDone,
}: {
  isOpen: boolean;
  toggleState: () => void;
  handleDone: () => void;
}) {
  return (
    <Modal
      handleConfirm={handleDone}
      trigger={null}
      isOpen={isOpen}
      toggleState={toggleState}
    >
      <Modal.Header>Edit profile picture</Modal.Header>
      <Modal.Body>
        <div className="flex justify-center pt-4">
          <div className="relative w-60 h-60 bg-dark rounded-lg mb-4">
            <Cropper />
          </div>
        </div>
        <ZoomSlider />
        <RotationSlider />
      </Modal.Body>

      <div className="flex gap-2 justify-end">
        <Modal.DiscardBtn>Cancel</Modal.DiscardBtn>
        <Modal.ConfirmBtn variant="primary">Done & Save</Modal.ConfirmBtn>
      </div>
    </Modal>
  );
}
