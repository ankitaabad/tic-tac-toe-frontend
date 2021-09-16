<script>
	import { is_game_over, my_moves, my_turn, opponent_moves, player2_connection_id } from '../store';

	import { get } from 'svelte/store';
	import { ws_select_cell } from '../socket';

	export let value = '';
	export let id;
	let clazz;
	export { clazz as class };
	const handleClick = (event) => {
		console.log(get(my_moves));
		const clicked_cell = parseInt(event.srcElement.id);
		if (is_valid_move(clicked_cell)) {
			my_moves.update((old_values) => {
				console.log(old_values);
				return [...old_values, clicked_cell];
			});
			my_turn.update((_) => false);
			ws_select_cell(get(player2_connection_id), clicked_cell);
		}
	};
	const is_valid_move = (curr_move) => {
		const turn = get(my_turn);
		
		if (!turn || get(is_game_over)!== '') {
			return false;
		}
		const moves = get(my_moves);
		const opp_moves = get(opponent_moves);
		return !(
			moves.some((move) => move === curr_move) || opp_moves.some((move) => move === curr_move)
		);
	};
</script>

<div {id} on:click={handleClick} class={clazz}>
	{value}
</div>

<style>
	div {
		font-family: 'Permanent Marker';
		font-size: 40px;
		/* border: 5px solid black; */
		width: 60px;
		height: 60px;
		text-align: center;
		vertical-align: middle;
		display: inline-flex;
		flex-wrap: wrap;
		color:#F20544;
	}
	.lb {
		border-left: 2px solid #363632;
	}
	.rb {
		border-right: 2px solid #363632;
	}
	.tb {
		border-top: 2px solid #363632;
	}
	.bb {
		border-bottom: 2px solid #363632;
	}
	:global(body) {
		background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
	}
</style>
