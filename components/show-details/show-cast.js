import CastMember from "./cast-member";
import styles from "./show-details.module.css";

export default function ShowCast({ credits }) {
  return (
    <div className={styles.imageContent}>
      <h5>CREDITS</h5>
      <div className={styles.creditsRow}>
        {credits.cast.map((actor) => (
          <CastMember
            personName={actor.name}
            personRole={actor.character}
            imagePath={actor.profile_path}
            key={actor.id}
          />
        ))}
      </div>
    </div>
  );
}
