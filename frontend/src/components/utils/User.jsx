function User({ user }) {
	return (
		<div className="user_card">
			<div className="user_card_content">
				<h3 className="user_card_title">
					<a href={`https://github.com/${user?.name}`}>{user?.name}</a>
				</h3>
				<div className="user_card_stat_container">
					<h5 className="user_card_stat_header">Commits:</h5>
					<span className="user_card_stat_content">{user?.commits}</span>
				</div>
				<div className="user_card_stat_container">
					<h5 className="user_card_stat_header">Additions:</h5>
					<span className="user_card_stat_content">{user?.additions}</span>
				</div>
				<div className="user_card_stat_container">
					<h5 className="user_card_stat_header">Deletions:</h5>
					<span className="user_card_stat_content">{user?.deletions}</span>
				</div>
				<div className="user_card_stat_container">
					<h5 className="user_card_stat_header">Addtions/Commit:</h5>
					<span className="user_card_stat_content">{user?.additionsPerCommit}</span>
				</div>
			</div>
		</div>
	);
}

export default User;
