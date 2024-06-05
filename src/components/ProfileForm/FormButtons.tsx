import Button from "@/src/components/Button/Button";

export default function FormButtons({
  edit,
  handleToggleEdit,
  resetForm,
  context,
}: {
  edit: boolean;
  handleToggleEdit: () => void;
  resetForm?: () => void;
  context: "Name" | "Email" | "Password";
}) {
  const saveText = `Save ${context}`;
  const changeText = `Change ${context}`;

  return (
    <div className="flex justify-end gap-2 mt-4 md:mt-0">
      {edit ? (
        <>
          <Button
            variant="default"
            onClick={() => {
              handleToggleEdit();
              resetForm && resetForm();
            }}
          >
            Discard
          </Button>
          <Button variant="primary" type="submit">
            {saveText}
          </Button>
        </>
      ) : (
        <Button variant="primary" onClick={handleToggleEdit}>
          {changeText}
        </Button>
      )}
    </div>
  );
}
