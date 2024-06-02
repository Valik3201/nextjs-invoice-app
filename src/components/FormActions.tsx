import Button from "./Button";

export default function FormActions({
  handleDiscard,
  handleSaveAsDraft,
  handleSubmit,
}: {
  handleDiscard: () => void;
  handleSaveAsDraft: () => void;
  handleSubmit: () => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 z-50 lg:ml-[103px] py-5 md:py-8 px-6 md:px-14 w-full md:w-[616px] flex justify-between shadow-[0_0_200px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_200px_0_rgba(0,0,0,0.3)] bg-white text-dark-darkest dark:bg-dark dark:text-white md:rounded-r-[1.25rem]">
      <Button variant="default" onClick={handleDiscard}>
        Discard
      </Button>

      <div className="flex gap-2">
        <Button variant="dark" onClick={handleSaveAsDraft}>
          Save as Draft
        </Button>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Save & Send
        </Button>
      </div>
    </div>
  );
}
