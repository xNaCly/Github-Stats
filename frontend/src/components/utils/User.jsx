function User({ user, num, landing = false }) {
	return (
		<div className={`user_card ${landing && "landingpage_user_card"}`}>
			<div className="user_card_content">
				<h5 className="orga_header">
					<a href={`https://github.com/${user?.name}`}>
						{user?.name} #{num + 1}
					</a>
				</h5>
				<div className="user_card_stat_container">
					<h5 className="user_card_stat_header">Commits:</h5>
					<span className="user_card_stat_content">
						{user?.commits?.toLocaleString()}
					</span>
				</div>
				<div className="user_card_stat_container">
					<h5 className="user_card_stat_header">Additions:</h5>
					<span className="user_card_stat_content">
						{user?.additions?.toLocaleString()}
					</span>
				</div>
				<div className="user_card_stat_container">
					<h5 className="user_card_stat_header">Deletions:</h5>
					<span className="user_card_stat_content">
						{user?.deletions?.toLocaleString()}
					</span>
				</div>
				<div className="user_card_stat_container">
					<h5 className="user_card_stat_header">Real additions:</h5>
					<span className="user_card_stat_content">
						{user?.realAdditions?.toLocaleString()}
					</span>
				</div>
				<div className="user_card_stat_container">
					<h5 className="user_card_stat_header">Addtions/Commit:</h5>
					<span className="user_card_stat_content">
						{user?.additionsPerCommit?.toLocaleString()}
					</span>
				</div>
			</div>
		</div>
	);
}

export default User;
