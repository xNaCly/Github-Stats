function OrgaComp({ orgaName, totalStats, landing = false }) {
	return (
		<div className={`orga_card ${landing && "landingpage_orga_card"}`}>
			<div className="orga_header">
				<a href={`https://github.com/${orgaName}`}>{orgaName}</a>
			</div>
			<div className="user_card_stat_container">
				<h5 className="user_card_stat_header">Total Commits</h5>
				<span className="user_card_stat_content">
					{totalStats.totalCommits?.toLocaleString()}
				</span>
			</div>
			<div className="user_card_stat_container">
				<h5 className="user_card_stat_header">Total Additions</h5>
				<span className="user_card_stat_content">
					{totalStats.totalAdditions?.toLocaleString()}
				</span>
			</div>
			<div className="user_card_stat_container">
				<h5 className="user_card_stat_header">Total Deletions</h5>
				<span className="user_card_stat_content">
					{totalStats.totalDeletions?.toLocaleString()}
				</span>
			</div>
			<div className="user_card_stat_container">
				<h5 className="user_card_stat_header">Total Real Additions</h5>
				<span className="user_card_stat_content">
					{totalStats.totalRealAdditions?.toLocaleString()}
				</span>
			</div>
			<div className="user_card_stat_container">
				<h5 className="user_card_stat_header">
					Total Additions/Commit
				</h5>
				<span className="user_card_stat_content">
					{totalStats.totalAdditionsPerCommit?.toLocaleString()}
				</span>
			</div>
		</div>
	);
}

export default OrgaComp;
