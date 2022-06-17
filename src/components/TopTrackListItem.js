function TopTrackListItem({ track, trackNumber }) {
  function formatDuration(totalSeconds) {
    return new Date(totalSeconds * 1000).toISOString().slice(14, 19);
  }
  return (
    <li className="flex py-4">
      <span className="flex-1">
        <strong>{trackNumber}.</strong> {track?.title}
      </span>
      <span>{formatDuration(track?.duration)}</span>
    </li>
  );
}

export default TopTrackListItem;
