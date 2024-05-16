import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";
import React, { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import FanthalTable from "./Components/FanthalTable";
import { InfoShort } from "./Constants/ResponseTypes";
import { SearchOption } from "./Constants/SearchOption";
import DetailPage from "./DetailPage";
import TableDataActionsFunc from "./store/actions/tableActions";
import { useFanthalSelector } from "./store/hooks/hooks";
function App() {
	const [selectedRow, setSelectedRow] = useState<InfoShort | undefined>(
		undefined
	);
	const [yearFilterVal, setYearFilterVal] = useState<string>("");
	const [typeFilterVal, setTypeFilterVal] = useState<string>("all");
	const [filters, setFilters] = useState<SearchOption[]>([]);
	const { searchState, pageData, errorMessage, loading } = useFanthalSelector(
		(store) => store.tableData
	);
	console.log(errorMessage);
	return (
		<div className="h-full w-full">
			{selectedRow ? (
				<div
					className="h-full w-full flex flex-col justify-center items-center"
					style={{ padding: 50 }}
				>
					<DetailPage
						info={selectedRow}
						onClose={() => {
							setSelectedRow(undefined);
						}}
					/>
				</div>
			) : (
				<div
					className="h-full w-full flex flex-col justify-center items-center"
					style={{ padding: 50 }}
				>
					<h1 style={{ fontSize: 40 }}>IMDB LIST</h1>
					<FanthalTable
						tableState={searchState}
						tableData={pageData}
						getTableData={TableDataActionsFunc.getTableData}
						changeSearchState={TableDataActionsFunc.updateTableState}
						headerColumns={[
							{ key: "imdbID", label: "IMDb ID" },
							{ key: "Title", label: "Title" },
							{ key: "Year", label: "Year" },
							{ key: "Type", label: "Type" },
						]}
						getDetailRow={(info: InfoShort) => {
							setSelectedRow(info);
						}}
						errorMessage={errorMessage}
						filterResults={filters}
						filterContent={
							<div
								className="flex flex-col justify-start items-center"
								style={{ width: 300, height: 250, padding: 16 }}
							>
								<Input
									className="dark"
									size="sm"
									label="Year"
									type="number"
									placeholder="Year"
									endContent={<CiCalendar size={25} />}
									value={yearFilterVal}
									onChange={(e) => {
										setYearFilterVal(e.target.value);
									}}
								/>
								<div className="dark w-full " style={{ marginTop: 15 }}>
									<RadioGroup
										value={typeFilterVal}
										onValueChange={setTypeFilterVal}
										className="dark w-full "
										contentEditable="plaintext-only"
										classNames={{
											wrapper:
												"flex flex-col justify-start items-center flex-wrap ",
										}}
									>
										<div className="w-full flex flex-row justify-between items-center	">
											<Radio defaultChecked value="all">
												All
											</Radio>
											<div style={{ color: "rgba(125,125,125,.5)" }}>
												Select search content type
											</div>
										</div>
										<div className="w-full flex flex-row justify-between items-center">
											<Radio value="movie">Movies</Radio>
											<Radio value="series">Series</Radio>
											<Radio value="game">Games</Radio>
										</div>
									</RadioGroup>
								</div>
								<div className="dark w-full" style={{ marginTop: 15 }}>
									<Button
										className="w-full hover:!bg-secondary"
										variant="flat"
										style={{ fontSize: 20, fontFamily: "Helvetica" }}
										onClick={() => {
											let newSearchOptions: SearchOption[] = [];
											if (yearFilterVal !== "") {
												newSearchOptions.push({
													key: "y",
													value: yearFilterVal,
												});
											}
											if (typeFilterVal !== "all") {
												newSearchOptions.push({
													key: "type",
													value: typeFilterVal,
												});
											}
											setFilters(newSearchOptions);
										}}
									>
										Filter
									</Button>
								</div>
								<div className="dark w-full" style={{ marginTop: 15 }}>
									<Button
										className="w-full hover:!bg-danger"
										variant="flat"
										style={{ fontSize: 20, fontFamily: "Helvetica" }}
										onClick={() => {
											setTypeFilterVal("all");
											setYearFilterVal("");
											setFilters([]);
										}}
									>
										Clear
									</Button>
								</div>
							</div>
						}
					/>
				</div>
			)}
		</div>
	);
}

export default App;
