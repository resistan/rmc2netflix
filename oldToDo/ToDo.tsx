import React from "react";
import { useSetRecoilState } from "recoil";
import { toDoState, IToDo, Categories } from "../../atoms";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
	margin: 10px 0;
	padding:10px;
	border-radius: 5px;
	background-color: ${props => props.theme.bgColor};
	color: ${props => props.theme.textColor};
`;

interface IDragProps {
	index: number;
}

const ToDo = ({ text, category, id, index }:IToDo) => {
	// const chageCat = (newCat: IToDo["category"]) => {
	// 	console.log(newCat);
	// 	useSetRecoilState()
	// }

	const setToDos = useSetRecoilState(toDoState);
	const chageCat = (event:React.MouseEvent<HTMLButtonElement>) => {
		const { currentTarget: { name }} = event;
		setToDos( (oldToDos) => {
			const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
			const oldToDo = oldToDos[targetIndex];
			const updateToDo = { text, id, category: name as any, index: targetIndex + 1 };
			return [...oldToDos.slice(0, targetIndex), updateToDo, ...oldToDos.slice(targetIndex + 1)];
		})
	}
	const delTodo = () => {
		setToDos( (oldToDos) => {
			const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
			console.log(targetIndex)
			return [...oldToDos.filter(toDo => toDo !== oldToDos[targetIndex])];
		})
	}
	return (
		<>
		<Draggable draggableId={`drag${id}`} index={index}>
			{(magic) => <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
				{/* <span {...magic.dragHandleProps}>handle</span> */}
				<span>{text}</span>
				{category !== Categories.TODO && <button name={Categories.TODO} onClick={chageCat}>To Do</button>}
				{category !== Categories.DOING && <button name={Categories.DOING} onClick={chageCat}>Doing</button>}
				{category !== Categories.DONE && <button name={Categories.DONE} onClick={chageCat}>Done</button>}
				<button onClick={delTodo}>Delete</button>
			</Card>}
		</Draggable>
		</>
	);
}

// export default React.memo(ToDo);