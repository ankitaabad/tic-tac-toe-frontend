import { writable } from 'svelte/store';

const my_moves = writable([]);
const opponent_moves = writable([]);
const my_turn = writable(false);
const my_char = writable('X');
const opponent_char = writable('O');
const player2_connection_id = writable('');
const game_id = writable('');
const is_game_over = writable("");
const socket = writable({});
export {
	my_moves,
	opponent_moves,
	my_turn,
	my_char,
	opponent_char,
	player2_connection_id,
	game_id,
	is_game_over,
	socket
};
