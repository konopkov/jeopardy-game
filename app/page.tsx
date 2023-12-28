"use client";

import Link from "next/link";
import { useState } from "react";

import styles from "./page.module.css";

export default function Home() {
  const [gameId, setGameId] = useState("");
  const [playerName, setPlayerName] = useState("");

  return (
    <section className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <Link
        className={styles.button}
        href={`/games/${gameId}?playerName=${playerName}`}
      >
        <button>Join</button>
      </Link>
    </section>
  );
}
