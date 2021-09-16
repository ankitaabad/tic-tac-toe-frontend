import { game_id, my_turn, opponent_moves, player2_connection_id, socket } from './store';
import { get } from 'svelte/store';

let ws;
socket.subscribe(val =>{
	console.log('socket',val);
	ws = val;
	ws.onmessage = (event) => {
		const data = JSON.parse(event.data);
		console.log(typeof data);
		console.log(data.cell_number);
		console.log(`>>>>>>>---------- inside where you want me to be ${data.cell_number} ----------<<<<<<<`);
		if (data.cell_number) {
			if (get(my_turn) === false) {
				opponent_moves.update((arr) => {
					const updated_moves = [...arr, data.cell_number];
					console.log({updated_moves});
					return updated_moves;
				});
				my_turn.update((_) => true);
			}
		} else if (data.connection_id) {
			player2_connection_id.update((_) => data.connection_id);
		} else if (data.game_id) {
			console.log(`>>>>>>>---------- updating game id ----------<<<<<<<`);
			game_id.update((_) => data.game_id);
		}
	};
});



const ws_create_game = () => {
	send_payload({
		action: 'create_game'
	});
};
const ws_join_game = (game_id) => {
	send_payload({
		action: 'join_game',
		game_id
	});
};

const ws_select_cell = (connection_id, cell_number) => {
	send_payload({
		action: 'select_cell',
		connection_id,
		cell_number
	});
};
const send_payload = (obj) => {
	ws.send(JSON.stringify(obj));
};
export { ws_create_game, ws_join_game, ws_select_cell };
