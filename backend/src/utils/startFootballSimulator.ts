import { WebSocketServer } from "ws";

const WEBSOCKET_SERVER_HOST = "localhost";
const WEBSOCKET_SERVER_PORT = 8080;

const wss = new WebSocketServer({ host: WEBSOCKET_SERVER_HOST, port: WEBSOCKET_SERVER_PORT });

console.log(`Websocket server running on ws://${wss.options.host}:${wss.options.port}`);

type Team = "Liverpool" | "Manchester United";

type MatchEventBase = {
	matchId: number;
	minute: number;
	createdAt: string;
};

type GoalEvent = MatchEventBase & {
	type: "GOAL";
	team: Team;
	player: string;
};

type CardEvent = MatchEventBase & {
  type: "YELLOW_CARD" | "RED_CARD";
  team: Team;
  player: string;
}

type SubstitutionEvent = MatchEventBase & {
  type: "SUBSTITUTION";
  team: Team;
  playerOut: string;
  playerIn: string;
}

type MatchEvent = GoalEvent | CardEvent | SubstitutionEvent;

type MatchStartedEvent = {
  	type: "MATCH_START";
	matchId: number;
	home: Team;
	away: Team;
	startedAt: string;
};

type WebsocketMatchStartPayload = {
	type: "MATCH_START",
	matchId: number;
};

type WebsocketNewEventPayload = {
	type: "NEW_EVENT",
	eventId: number;
};

type WebsocketMatchEndPayload = {
	type: "MATCH_END",
	matchId: number;
};

type WebsocketPayloads = WebsocketMatchStartPayload | WebsocketNewEventPayload | WebsocketMatchEndPayload;

const broadcast = (data: WebsocketPayloads) => {
  	const msg = JSON.stringify(data);

	for (const client of wss.clients) {
		if (client.readyState !== 1) continue;

		client.send(msg);
	}
};

const startMatch = async () => {
	const matchId = Date.now();
	let minute = 0;

	const matchInfo: MatchStartedEvent = {
		type: "MATCH_START",
		matchId,
		home: "Liverpool",
		away: "Manchester United",
		startedAt: new Date().toISOString(),
	};

	console.log(`Starting match: ${matchInfo.home} vs ${matchInfo.away}`);

	// const insertedMatch = await db.from("matches").insert(matchInfo);
	const MATCH_ID = 1;

	broadcast({ type: "MATCH_START", matchId: MATCH_ID }); // TODO: matchId from inserted match ❌

	const interval = setInterval(async () => {
		minute += 5;

		const event = generateEvent(matchId, minute);

		if (event !== null) {
			// const insertedEvent = await db.from("events").insert(event);
			const EVENT_ID = 1;

			broadcast({ type: "NEW_EVENT", eventId: EVENT_ID }); // TODO: eventId from inserted event ❌

			console.log("New Event:", EVENT_ID);
		}

		if (minute >= 90) {
			clearInterval(interval);
			// const updatedMatch = await db.from("matches").update(data) // TODO: set ended date of match ❌
			
			broadcast({ type: "MATCH_END", matchId: MATCH_ID });
			
			console.log("Match ended.");
		}
	}, 2_000);
};

function generateEvent(matchId: number, minute: number): MatchEvent | null {
	const events: (MatchEvent | null)[] = [
		null,
		{ type: "GOAL", team: "Liverpool", player: "Mohamed Salah", matchId, minute, createdAt: new Date().toISOString() },
		{ type: "GOAL", team: "Manchester United", player: "Marcus Rashford", matchId, minute, createdAt: new Date().toISOString() },
		{ type: "YELLOW_CARD", team: "Liverpool", player: "Virgil van Dijk", matchId, minute, createdAt: new Date().toISOString() },
		{ type: "YELLOW_CARD", team: "Manchester United", player: "Casemiro", matchId, minute, createdAt: new Date().toISOString() },
		{ type: "SUBSTITUTION", team: "Liverpool", playerOut: "Luis Díaz", playerIn: "Alexander Isak", matchId, minute, createdAt: new Date().toISOString() },
		{ type: "SUBSTITUTION", team: "Manchester United", playerOut: "Mason Mount", playerIn: "Bruno Fernandes", matchId, minute, createdAt: new Date().toISOString() },
	];

	/** Increases odds of null event. */
	const randomIndex = Math.floor(Math.random() * events.length * 2);
	
	return events[randomIndex] || null;
};

startMatch();
