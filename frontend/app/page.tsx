"use client"

import { useState, useEffect } from "react";
import styles from "@/app/dashboard.module.css";

const mockMatchData = {
	homeTeam: "Manchester United",
	awayTeam: "Liverpool",
	homeScore: 2,
	awayScore: 1,
	minute: 78,
	status: "LIVE",
}

const mockEvents = [
	{ id: 1, minute: 12, type: "goal", team: "home", player: "Marcus Rashford", description: "Goal scored" },
	{ id: 2, minute: 34, type: "yellow", team: "away", player: "Virgil van Dijk", description: "Yellow card" },
	{ id: 3, minute: 56, type: "goal", team: "away", player: "Mohamed Salah", description: "Goal scored" },
	{ id: 4, minute: 67, type: "goal", team: "home", player: "Bruno Fernandes", description: "Goal scored" },
	{
		id: 5,
		minute: 72,
		type: "substitution",
		team: "home",
		player: "Antony → Jadon Sancho",
		description: "Substitution",
	},
]

const Dashboard = () => {
	const [latency, setLatency] = useState(45);
	const [updateCount, setUpdateCount] = useState(0);

	// Simulate real-time updates
	useEffect(() => {
		const interval = setInterval(() => {
			setLatency(Math.floor(Math.random() * 20) + 35); // 35-55ms
			setUpdateCount((prev) => prev + 1);
		}, 2_000)

		return () => clearInterval(interval);
	}, []);

	const getEventIcon = (type: string) => {
		switch (type) {
			case "goal":
				return "⚽"
			case "yellow":
				return "🟨"
			case "red":
				return "🟥"
			case "substitution":
				return "🔄"
			default:
				return "📝"
		}
	};

	return (
		<div className={styles.dashboard}>
			<div className={styles.container}>
				<header className={styles.header}>
					<div className={styles.logo}>
						<div className={styles.logoIcon}>⚽</div>
						SoccerLive Dashboard
					</div>
					<div className={styles.status}>
						<div className={styles.liveIndicator}></div>
						<span>LIVE</span>
					</div>
				</header>

				<main className={styles.main}>
					{/* Live Match Scores Section */}
					<section className={styles.section}>
						<h2 className={styles.sectionTitle}>Live Match Scores</h2>
						<div className={styles.matchCard}>
							<div className={styles.matchHeader}>
								<span className={styles.matchStatus}>{mockMatchData.status}</span>
								<span className={styles.matchTime}>{mockMatchData.minute}'</span>
							</div>
							<div className={styles.matchScore}>
								<div className={styles.team}>
									<span className={styles.teamName}>{mockMatchData.homeTeam}</span>
									<span className={styles.score}>{mockMatchData.homeScore}</span>
								</div>
								<div className={styles.vs}>VS</div>
								<div className={styles.team}>
									<span className={styles.score}>{mockMatchData.awayScore}</span>
									<span className={styles.teamName}>{mockMatchData.awayTeam}</span>
								</div>
							</div>
						</div>
					</section>

					{/* Event Timeline Section */}
					<section className={styles.section}>
						<h2 className={styles.sectionTitle}>Event Timeline</h2>
						<div className={styles.timeline}>
							{mockEvents.map((event) => (
								<div key={event.id} className={styles.timelineEvent}>
									<div className={styles.eventTime}>{event.minute}'</div>
									<div className={styles.eventIcon}>{getEventIcon(event.type)}</div>
									<div className={styles.eventDetails}>
										<div className={styles.eventPlayer}>{event.player}</div>
										<div className={styles.eventDescription}>{event.description}</div>
									</div>
									<div className={`${styles.eventTeam} ${event.team === "home" ? styles.homeTeam : styles.awayTeam}`}>
										{event.team === "home" ? "MUN" : "LIV"}
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Latency Metrics Section */}
					<section className={styles.section}>
						<h2 className={styles.sectionTitle}>Latency Metrics</h2>
						<div className={styles.metricsGrid}>
							<div className={styles.metricCard}>
								<div className={styles.metricValue}>{latency}ms</div>
								<div className={styles.metricLabel}>Current Latency</div>
								<div className={styles.metricStatus}>
									<div className={styles.statusIndicator}></div>
									Excellent
								</div>
							</div>
							<div className={styles.metricCard}>
								<div className={styles.metricValue}>42ms</div>
								<div className={styles.metricLabel}>Average Latency</div>
								<div className={styles.metricStatus}>
									<div className={styles.statusIndicator}></div>
									Stable
								</div>
							</div>
							<div className={styles.metricCard}>
								<div className={styles.metricValue}>{updateCount}</div>
								<div className={styles.metricLabel}>Updates Received</div>
								<div className={styles.metricStatus}>
									<div className={styles.statusIndicator}></div>
									Active
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
};

export default Dashboard;