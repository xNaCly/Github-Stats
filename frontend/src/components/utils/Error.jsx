function Error({ text, type }) {
	return <span className={`alert ${type}`}>{text}</span>;
}

export default Error;
