import {
	Button,
	Input,
	Pagination,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
} from "@nextui-org/react";
import React, {
	FunctionComponent,
	ReactNode,
	useEffect,
	useState,
} from "react";
import { IoSearch } from "react-icons/io5";
import { MdFilterListAlt } from "react-icons/md";
import { InfoShort } from "../Constants/ResponseTypes";
import { SearchOption } from "../Constants/SearchOption";
import { useFanthalDispatch } from "../store/hooks/hooks";
import { PageData, SearchState } from "../store/reducer/tableReducer";
import { FanthalDispatch } from "../store/store";

interface FanthalTableProps {
	tableState: SearchState;

	tableData: PageData;
	getTableData: (
		searchParam: string,
		page: number,
		searchOptions?: SearchOption[]
	) => (dispatch: FanthalDispatch) => void;
	changeSearchState: (
		state: SearchState
	) => (dispatch: FanthalDispatch) => void;
	getDetailRow: (movie: InfoShort) => void;
	headerColumns: { key: string; label: string }[];
	filterContent?: ReactNode;
	filterResults?: SearchOption[];
	errorMessage?: string;
	loadingData?: boolean;
}
type TimerId = ReturnType<typeof setTimeout>;

interface DebouncedFunction<T extends (...args: any[]) => any> {
	(...args: Parameters<T>): void;
	cancel(): void;
}

function debounce<T extends (...args: any[]) => any>(
	func: T,
	delay: number
): DebouncedFunction<T> {
	let timerId: TimerId | null;

	const debouncedFunc: DebouncedFunction<T> = function (
		this: any,
		...args: Parameters<T>
	): void {
		const context = this;

		clearTimeout(timerId as TimerId);
		timerId = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};

	debouncedFunc.cancel = function (): void {
		clearTimeout(timerId as TimerId);
	};

	return debouncedFunc;
}

const FanthalTable: FunctionComponent<FanthalTableProps> = (props) => {
	const [searchParam, setSearchParam] = useState<string>(
		props.tableState.searchParam
	);
	const dispatch = useFanthalDispatch();
	useEffect(() => {
		const searchWithDebounce = debounce((query: string) => {
			dispatch(
				props.changeSearchState({
					...props.tableState,
					searchParam: searchParam,
				})
			);
		}, 100);

		// Her inputValue değiştiğinde, debounce edilmiş arama işlevini çağırır.
		searchWithDebounce(searchParam);

		// Temizlik
		return () => {
			searchWithDebounce.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParam]);

	useEffect(() => {
		dispatch(
			props.getTableData(
				props.tableState.searchParam,
				props.tableState.page,
				props.tableState.searchOptions
			)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.tableState]);

	useEffect(() => {
		dispatch(
			props.changeSearchState({
				...props.tableState,
				searchOptions: props.filterResults ?? [],
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.filterResults]);
	return (
		<div
			className="flex flex-col justify-center items-center w-full h-full"
			style={{ padding: 25 }}
		>
			<div
				className="w-full flex flex-row justify-between items-center"
				style={{ marginBottom: 10, marginRight: 16, marginLeft: 16 }}
			>
				<div></div>
				<div className="flex flex-row justify-around items-center">
					{props.filterContent && (
						<Popover
							placement="bottom"
							showArrow={true}
							color="foreground"
						>
							<PopoverTrigger>
								<Button
									isIconOnly
									color="secondary"
									variant="light"
									style={{ marginRight: 7 }}
								>
									<MdFilterListAlt size={26} />
								</Button>
							</PopoverTrigger>
							<PopoverContent>{props.filterContent}</PopoverContent>
						</Popover>
					)}
					<Input
						size="md"
						placeholder="Search"
						endContent={<IoSearch />}
						value={searchParam}
						onChange={(e) => {
							setSearchParam(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className="w-full h-full">
				<Table
					bottomContent={
						<div className="flex w-full justify-center">
							<Pagination
								isCompact
								showControls
								showShadow
								page={props.tableState.page}
								color="secondary"
								total={props.tableData.totalPages}
								onChange={(page) => {
									dispatch(
										props.changeSearchState({
											...props.tableState,
											page: page,
										})
									);
								}}
							/>
						</div>
					}
				>
					<TableHeader>
						{props.headerColumns.map((item) => (
							<TableColumn key={item.key}>{item.label}</TableColumn>
						))}
					</TableHeader>
					<TableBody
						emptyContent={props.errorMessage}
						loadingContent={<Spinner />}
						items={props.tableData.data ?? []}
					>
						{(item) => {
							return (
								<TableRow
									key={item.Title}
									onClick={() => {
										props.getDetailRow(item);
									}}
									style={{ cursor: "pointer" }}
									className="hover:bg-default-200"
								>
									{(columnKey) => (
										<TableCell>
											{getKeyValue(item, columnKey)}
										</TableCell>
									)}
								</TableRow>
							);
						}}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
export default FanthalTable;
