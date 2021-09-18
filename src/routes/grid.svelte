<script>
	import { get } from 'svelte/store';
	import LinearProgress from '@smui/linear-progress';

	import {
		my_moves,
		opponent_moves,
		my_turn,
		player2_connection_id,
		game_id,
		my_char,
		opponent_char,
		is_game_over
	} from '../store';

	import Cell from './cell.svelte';
	import { check_game_status } from '../check_result';

	$: g_id = get(game_id);
	$: i_g_o = get(is_game_over);
	is_game_over.subscribe((val) => {
		i_g_o = val;
	});
	let arr = new Array(10).fill('');

	// $: waiting_for_opponent = get(my_char)=== 'X';
	$: ready = false;
	$: whose_turn = get(my_turn) ? 'Your Turn' : 'Waiting for Opponent';
	let cross_player = get(my_char) === 'X';
	my_moves.subscribe((moves) => {
		console.log('m_m', moves);
		moves.forEach((move) => {
			arr[move] = get(my_char);
		});
		const won = check_game_status(moves,get(opponent_moves));
		if (won) {
			let status = 'You Won';
			if (won.type === 'DRAW') {
				status = 'Draw';
			}
			is_game_over.update((_) => status);
		}
	});

	game_id.subscribe((id) => {
		console.log('getting the game is', id);
		g_id = id;
	});

	player2_connection_id.subscribe((_) => {
		ready = true;
	});
	opponent_moves.subscribe((opponent_moves) => {
		console.log('o_m', opponent_moves);
		opponent_moves.forEach((move) => {
			arr[move] = get(opponent_char);
		});
		const won = check_game_status(opponent_moves, get(my_moves));
		console.log('won', won);
		if (won) {
			let status = 'You Lose';
			if (won.type === 'DRAW') {
				status = 'Draw';
			}
			is_game_over.update((_) => status);
		}
	});
	my_turn.subscribe((value) => {
		console.log({ whose_turn });
		whose_turn = value ? 'Your Turn' : 'Waiting for Opponent';
	});
</script>

<!-- {#each range as i}
<div>
    {#each range as j}
        <Cell id={(3*(i-1)+j)} value={arr[3*(i-1)+j]}/>
    {/each}
</div>
{/each} -->
{#if cross_player && g_id === ''}
	<div>
		<div>Creating a new Game</div>
		<LinearProgress indeterminate />
	</div>
{/if}
{#if !cross_player || g_id !== ''}
	<div class="patrick-font">Game Id: {g_id}</div>
	<br />
	<br />
{/if}

{#if g_id !== '' && cross_player && !ready}
	<div>
		<LinearProgress indeterminate />
		<div>waiting for opponent to join</div>
	</div>
{/if}
{#if !cross_player && !ready}
	<div>
		<LinearProgress indeterminate />
		<div class="marker-font">Loading Game....</div>
	</div>
{/if}

{#if ready}
	<div style="width:100%">
		<div class="turn marker-font">{whose_turn}</div>
		<br />
		<div class="grid">
			<div>
				<Cell id="1" value={arr[1]} class="rb bb" />

				<Cell id="2" value={arr[2]} class="rb bb" />

				<Cell id="3" value={arr[3]} class="bb" />
			</div>
			<div>
				<Cell id="4" value={arr[4]} class="rb bb" />

				<Cell id="5" value={arr[5]} class="rb bb" />

				<Cell id="6" value={arr[6]} class="bb" />
			</div>
			<div>
				<Cell id="7" value={arr[7]} class="rb " />

				<Cell id="8" value={arr[8]} class="rb " />

				<Cell id="9" value={arr[9]} class="" />
			</div>
		</div>
	</div>
{/if}
{#if i_g_o !== ''}
	<br />
	<div class="game_over">{i_g_o}</div>
{/if}

<style>
	div {
		color: #fdfaef;
		font-size: 25px;
		font-family: 'Patrick Hand';
		text-align: center;
	}
	.marker-font {
		font-family: 'Permanent Marker';
		font-size: 25px;
		color: #636057;
	}
	.game_over {
		font-family: 'Permanent Marker';
		font-size: 45px;
		color: #636057;
	}
	.patrick-font {
		font-family: 'Patrick Hand';
		font-size: 40px;
		color: #d95f69;
	}
	.grid {
		max-width: 200px;

		margin: auto;
	}
</style>
