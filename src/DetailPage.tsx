import { Button, Spinner } from "@nextui-org/react";
import React, { FunctionComponent, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { InfoFull, InfoShort } from "./Constants/ResponseTypes";
import { handleGetDetailData } from "./Services/imdbServices";
interface DetailPageProps {
	info: InfoShort;
	onClose: () => void;
}
const DetailPage: FunctionComponent<DetailPageProps> = (props) => {
	const [info, setInfo] = useState<InfoFull>();

	useEffect(() => {
		handleGetDetailData(props.info.imdbID)
			.then((res) => setInfo(res.data))
			.catch((err) => {
				console.log(err);
			});
	}, [props.info]);

	if (!info) return <Spinner size="lg" />;
	return (
		<div
			className="flex flex-row justify-content items-center w-full h-full shadow-md shadow-foreground/40 "
			style={{
				border: "1px solid rgba(125,125,125,.5)",
				position: "relative",
				borderRadius: 10,
			}}
		>
			<div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
				<Button
					isIconOnly
					variant="light"
					size="lg"
					onClick={props.onClose}
				>
					<RxCross2 size="40" />
				</Button>
			</div>
			<div className="h-full " style={{ width: "30%" }}>
				<img
					style={{
						height: "100%",
						borderTopLeftRadius: 10,
						borderBottomLeftRadius: 10,
						objectFit: "contain",
					}}
					src={info.Poster}
					title={info.Title}
					alt={info.Title}
				/>
			</div>
			<div
				className="flex flex-col justify-start items-start h-full"
				style={{
					paddingTop: 30,
					paddingRight: 30,
					paddingLeft: "1.5rem",
					width: "70%",
				}}
			>
				<div className="w-full flex flex-row justify-between items-center">
					<div
						className="font-semibold"
						style={{ width: "60%", fontSize: 40 }}
					>
						{info.Title}
					</div>
				</div>
				<div
					className="w-full flex flex-row justify-start items-center"
					style={{
						fontSize: 12,
						color: "rgba(245,245,245,.85)",
						fontWeight: "bold",
					}}
				>
					{info.imdbRating !== "N/A" && (
						<div style={{ marginRight: 10 }}>
							{`MetaScore: ${info.Metascore}/100`}
						</div>
					)}
					{info.Metascore !== "N/A" && (
						<div style={{ marginRight: 10 }}>
							{`IMDb: ${info.imdbRating}/10`}
						</div>
					)}
					{info.Released !== "N/A" && (
						<div style={{ marginRight: 10 }}>{info.Released}</div>
					)}
					{info.Runtime !== "N/A" && (
						<div style={{ marginRight: 10 }}>{info.Runtime}</div>
					)}
					{info.totalSeasons && (
						<div
							style={{ marginRight: 10 }}
						>{`${info.totalSeasons} Season`}</div>
					)}
					{info.Type !== "N/A" && (
						<div style={{ marginRight: 10 }}>
							{info.Type.toUpperCase()}
						</div>
					)}
				</div>
				<div
					className="flex flex-row justify-start items-center"
					style={{ fontSize: 13, color: "darkGray", fontWeight: "bold" }}
				>
					<div
						style={{ marginRight: 10 }}
					>{`${info.Language} / ${info.Country}`}</div>
				</div>
				<div
					className="w-full flex flex-row justify-between items-start"
					style={{
						marginTop: 40,
						marginBottom: 40,
						height: "60%",
					}}
				>
					<p style={{ width: "60%" }}>{info.Plot}</p>
					<div
						className="flex flex-col justify-center items-start "
						style={{ fontSize: 14, color: "gray" }}
					>
						{info.Genre !== "N/A" && (
							<div style={{ marginBottom: "1rem" }}>
								Genre(s):
								<span style={{ color: "white" }}> {info.Genre}</span>
							</div>
						)}
						{info.Actors !== "N/A" && (
							<div style={{ marginBottom: "1rem" }}>
								Actors:
								<span style={{ color: "white" }}> {info.Actors}</span>
							</div>
						)}
						{info.Writer !== "N/A" && (
							<div style={{ marginBottom: "1rem" }}>
								Writer(s):
								<span style={{ color: "white" }}> {info.Writer}</span>
							</div>
						)}
						{info.Awards !== "N/A" && (
							<div style={{ marginBottom: "1rem" }}>
								Awards(s):
								<span style={{ color: "white" }}> {info.Awards}</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default DetailPage;
