<script>
	import { goto } from '$app/navigation';
	import { my_char, my_turn, opponent_char, socket } from '../store';
	import Button, { Label } from '@smui/button';
	import { ws_create_game, ws_join_game } from '../socket';
	import { onMount } from 'svelte';
	const create_game = () => {
		console.log('hello ');
		goto('/grid');
		my_char.update((_) => 'X');
		opponent_char.update((_) => 'O');
		my_turn.update((_) => true);
		ws_create_game();
	};
	const join_game = () => {
		console.log('inside join game');
		goto('/join_game');
		my_char.update((_) => 'O');
		opponent_char.update((_) => 'X');
		my_turn.update((_) => false);
		ws_join_game();
	};
	onMount(async () => {
		socket.update((_) => {
			return new WebSocket('wss://1loc5439rb.execute-api.ap-south-1.amazonaws.com/dev');
		});
	});
</script>

<div>
	

		<Button variant="raised"  style="width:100%;"  on:click={create_game}>
			<Label>Create Game</Label>
		</Button>
	
	<br />

	<Button variant="raised"  style="width:100%;"  on:click={join_game}>
		<Label>Join Game</Label>
	</Button>
</div>

<style>
	div {
		display: flex;
		width: 100%;
		flex-direction: column;
		
	}

	
</style>
