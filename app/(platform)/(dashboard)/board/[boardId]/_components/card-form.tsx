interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
  ref: React.RefObject<HTMLTextAreaElement>;
}
function CardForm({
  listId,
  isEditing,
  enableEditing,
  disableEditing,
}: CardFormProps) {
  return <div>Card form</div>;
}

export default CardForm;
