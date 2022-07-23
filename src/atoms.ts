import { atom, selector }	from 'recoil';

const localStorageEffect = (key: string) => <T>( {setSelf, onSet} : any ) => {
	const savedValue = localStorage.getItem(key);
	if (savedValue != null) {
		setSelf(JSON.parse(savedValue));
	}
	onSet((newValue: IToDo[], _: any, isReset: boolean ): void => {
		isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
	})
}

export const isDarkAtom = atom({
	key: 'isDark',
	default: false,
	effects: [localStorageEffect('isDark')]
});

export enum Categories {
	"DONE" = "DONE",
	"TODO" = "TODO",
	"DOING" = "DOING"
}

export const categoryState = atom<Categories>({
	key: 'category',
	default: Categories.TODO
});

export interface IToDo {
	text: string;
	id: number;
	category: Categories;
	index: number;
}

export const toDoState = atom<IToDo[]>({
	key: 'toDo',
	default: [],
	effects: [localStorageEffect('toDo')]
});

export const toDoSelector = selector({
	key: 'toDoSelector',
	get: ({ get }) => {
		const toDos = get(toDoState);
		const category = get(categoryState);
		// if(category === "TODO") return toDos.filter(todo => todo.category === "TODO")
		return toDos.filter(todo => todo.category === category)
	}
});

export interface IBoardProps {
	toDos: InewTodo[];
	boardId: string;
}

export interface InewTodo {
	id: number;
	text: string;
}
export interface IToDoState {
	[key:string]: InewTodo[];
}

export const newToDoState = atom<IToDoState>({
	key: 'newToDo',
	default: {
		"To do": [],
		"Doing": [],
		"Done": []
	},
	effects: [localStorageEffect('newToDo')]
});

export const newCatSelector = selector({
	key: 'newCatSelector',
	get: ({ get }) => {
		const newToDos = get(newToDoState);
		const newCats = Object.keys(newToDos)
		return newCats;
	}
});