import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, IToDo, toDoSelector, toDoState } from "../../atoms";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CreateToDo from "./CreateToDo";
import Board from "./Board";

const ToDoList = () => {
	const [toDo, setToDo] = useState("");
	const [toDoError, setToDoError] = useState("");
	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		if(value.length < 10) {
			setToDoError("ToDo must be at least 10 characters long");
		} else {
			setToDoError("")
		}
		setToDo(value);
	}
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	}
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" value={toDo} onChange={onChange} placeholder="Add a todo" />
				<button>Add</button>
				{toDoError && <p>{toDoError}</p>}
			</form>
		</div>
	)
}

const Wrapper = styled.div`
	max-width:890px;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
`;
const Boards = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
`;


const ToDoList = () => {
	const [ category, setCategory ] = useRecoilState(categoryState);
	const [ toDos, setToDos ] = useRecoilState(toDoState);

	const onSelect = (event:React.FormEvent<HTMLSelectElement>) => {
		// const { value } = event.currentTarget;
		// setCategory(value as any);
	}
	const categories = Object.values(Categories);
	const onDragEnd = ({draggableId, destination, source}:DropResult) => {
		if(!destination) return;
		setToDos((oldToDos) => {
			const copyToDos = [...oldToDos];
			copyToDos.splice(source.index, 1);
			copyToDos.splice(destination?.index, 0, oldToDos[source.index]);
			return copyToDos;
		})
	};
	// console.log(toDos);
	return (
		<>
			<Helmet>
				<title>To Do List</title>
			</Helmet>
			<h1>To Do List</h1>
			{<select onInput={onSelect} value={category}>
				<option value={Categories.TODO}>To Do</option>
				<option value={Categories.DOING}>Doing</option>
				<option value={Categories.DONE}>Done</option>
			</select>}
			<CreateToDo />
			<hr />
			<Wrapper>
				<DragDropContext onDragEnd={onDragEnd}>
					<Boards>
						{categories.map( (category) => 
							<Board boardId={category} key={category} />
						)}
					</Boards>
				</DragDropContext>
			</Wrapper>
		</>
	)
}

// export default ToDoList;