import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toDoState, categoryState } from "../atoms";

interface IForm {
	toDo: string;
}

const CreateToDo = () => {
	const setToDos = useSetRecoilState(toDoState);
	const category = useRecoilValue(categoryState);
	const { register, handleSubmit, setValue } = useForm<IForm>();
	const handleValid = ({ toDo }:IForm) => {
		setToDos( oldToDos => {
			let newIndex = oldToDos.length > 0 ? oldToDos.length + 1 : 0;
			const newToDo = [{text: toDo, id:Date.now(), category: category, index: newIndex}, ...oldToDos];
			return newToDo;
		});
		setValue("toDo", "");
	}
	return (
		<form onSubmit={handleSubmit(handleValid)}>
			<input {...register("toDo", {required: "Please enter something"})} type="text" placeholder="Add a todo" />
			<button>Add</button>
		</form>
	);
}

export default CreateToDo