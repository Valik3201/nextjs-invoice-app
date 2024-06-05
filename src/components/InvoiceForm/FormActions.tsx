import Button from "../Button/Button";

export default function FormActions({
  action,
  handleDiscard,
  handleSaveAsDraft,
  handleSubmit,
}: {
  action: "new" | "edit";
  handleDiscard: () => void;
  handleSaveAsDraft: () => void;
  handleSubmit: () => void;
}) {
  return (
    <div
      className={`fixed bottom-0 left-0 z-50 lg:ml-[103px] py-5 md:py-8 px-6 md:px-14 w-full md:w-[616px] flex shadow-[0_0_200px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_200px_0_rgba(0,0,0,0.3)] bg-white text-dark-darkest dark:bg-dark dark:text-white md:rounded-r-[1.25rem] ${
        action === "new" ? "justify-between" : "justify-end gap-2"
      }`}
    >
      <Button variant="default" onClick={handleDiscard}>
        {action === "new" ? "Discard" : "Cancel"}
      </Button>

      <div className="flex gap-2">
        {action === "new" && (
          <Button variant="dark" onClick={handleSaveAsDraft}>
            Save as Draft
          </Button>
        )}

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {action === "new" ? "Save & Send" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
