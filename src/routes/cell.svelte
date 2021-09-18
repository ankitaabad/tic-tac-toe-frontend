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

<div {id} on:click={handleClick} style="text-align:center" class={clazz}>
	{value}
</div>

<style>
	div {
		font-family: 'Permanent Marker';
		font-size: 40px;
		flex-direction: column;
		/* border: 5px solid black; */
		width: 60px;
		height: 60px;
		text-align: center !important;
		vertical-align: middle !important;
		display: inline-flex;
		flex-wrap: wrap;	
		color:#F7FFF7;
		text-align: center;
		vertical-align: middle;
		padding:auto;
		
	}

	.lb {
		border-left: 3px solid #494846;
	}
	.rb {
		border-right: 3px solid #494846;
	}
	.tb {
		border-top: 3px solid #494846;
	}
	.bb {
		border-bottom: 3px solid #494846;
	}
	:global(body) {
		background: #C6FFDD;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #f7797d, #FBD786, #C6FFDD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


	}
</style>
