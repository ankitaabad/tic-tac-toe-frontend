<script>
	let g_id = '';
	import TextField from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import { goto } from '$app/navigation';
	import { game_id, my_char, my_turn, opponent_char } from '../store';
	import { ws_join_game } from '../socket';
	import { get } from 'svelte/store';
	const join_game = () => {
        console.log("joining game: ");
		game_id.update(_ => g_id);
        my_turn.update(_=> false);
		goto('/grid');

		ws_join_game(g_id);
	};
</script>

<div>
	<TextField
		class="shaped-outlined"
		variant="outlined"
		display="block"
		bind:value={g_id}
		label="Enter Game Id"
	/>
	<br />

	<Button variant="raised" display="block" style={{ fontSize: '20px' }} on:click={join_game}
		>Join Game</Button
	>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
	}
</style>
