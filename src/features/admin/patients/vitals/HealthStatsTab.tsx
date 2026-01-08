import { Activity, Trash, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/Card";
import type { HealthStat, PatientDetailsVm } from "../../../../lib/types";
import { AddHealthStat } from "./AddHealthStat";
import { Button } from "../../../../components/ui/PrimaryButton";
import { EditHealthStatsForm } from "./EditHealthStatsForm";
import { Pill } from "../../../../components/ui/Pill";
import { format } from "date-fns";
import { useState } from "react";
import { statIcons } from "../../../../lib/StatsIcons";
import { useDeleteHealthStat } from "../../../../hooks/useHealthStats";

type HealthStatsProps = {
	patient: PatientDetailsVm;
	healthStats: HealthStat[];
};

export const HealthStatsTab = ({ healthStats, patient }: HealthStatsProps) => {
	const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
	const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
	const deleteMutation = useDeleteHealthStat(patient.id);

	const getStatusVariant = (status: string) => {
		switch (status) {
			case "normal":
				return "secondary";
			case "warning":
				return "warning";
			case "critical":
				return "destructive";
			default:
				return "default";
		}
	};

	const getTypeLabel = (type: string) => {
		return type
			.split("_")
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};

	const handleDelete = (statId: string) => {
		if (confirm("Are you sure you want to delete this health stat?")) {
			deleteMutation.mutate(statId, {
				onError: () => {
					alert("Failed to delete health stat. Please try again.");
				}
			});
		}
	};

	// Group health stats by type
	const groupedStats = healthStats.reduce(
		(acc, stat) => {
			if (!acc[stat.type]) {
				acc[stat.type] = [];
			}
			acc[stat.type].push(stat);
			return acc;
		},
		{} as Record<string, HealthStat[]>
	);

	// Sort each group by date (newest first) and sort groups alphabetically
	const sortedGroups = Object.entries(groupedStats)
		.sort(([typeA], [typeB]) => getTypeLabel(typeA).localeCompare(getTypeLabel(typeB)))
		.map(([type, stats]) => ({
			type,
			stats: stats.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		}));

	// Get all unique types for the filter
	const allTypes = sortedGroups.map(({ type }) => type);

	// Filter groups based on selected types (show all if none selected)
	const filteredGroups = selectedTypes.size === 0 ? sortedGroups : sortedGroups.filter(({ type }) => selectedTypes.has(type));

	const toggleType = (type: string) => {
		setSelectedTypes(prev => {
			const newSet = new Set(prev);
			if (newSet.has(type)) {
				newSet.delete(type);
			} else {
				newSet.add(type);
			}
			return newSet;
		});
	};

	const toggleGroup = (type: string) => {
		setExpandedGroups(prev => ({
			...prev,
			[type]: !prev[type]
		}));
	};

	return (
		<>
			<div className="w-fit">
				<AddHealthStat patient={patient} />
			</div>

			<Card className="hover:shadow-none h-max">
				<CardHeader className="p-5 pb-3">
					<CardTitle className="text-lg flex items-center gap-2 text-foreground">
						<Activity className="h-5 w-5 text-primary" size={20} />
						Health Statistics
					</CardTitle>

					{allTypes.length > 0 && (
						<div className="mt-4 flex items-center gap-3 flex-wrap">
							<p className="ml-2 text-sm text-muted-foreground font-medium">Filter by type:</p>
							<div className="flex flex-wrap gap-2">
								{allTypes.map(type => {
									const TypeIcon = statIcons[type] || Activity;
									const isSelected = selectedTypes.has(type);
									return (
										<Button
											key={type}
											onClick={() => toggleType(type)}
											variant={isSelected ? "default" : "outline"}
											size="sm"
											className="rounded-full"
										>
											<TypeIcon className="h-3.5 w-3.5" />
											{getTypeLabel(type)}
										</Button>
									);
								})}
							</div>
						</div>
					)}
				</CardHeader>

				<CardContent className="p-6 pt-0">
					{healthStats.length === 0 ? (
						<p className="text-muted-foreground text-sm">No health statistics recorded</p>
					) : filteredGroups.length === 0 ? (
						<p className="text-muted-foreground text-sm text-center py-4">No statistics match the selected filters</p>
					) : (
						<div className="space-y-6">
							{filteredGroups.map(({ type, stats }) => {
								const isExpanded = expandedGroups[type] || false;
								const displayedStats = isExpanded ? stats : stats.slice(0, 3);
								const hasMore = stats.length > 3;
								const remainingCount = stats.length - 3;
								const TypeIcon = statIcons[type] || Activity;

								return (
									<div
										key={type}
										className="border border-foreground/10 rounded-lg p-4 bg-background/50 hover:bg-background/80 transition-colors"
									>
										<h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
											<TypeIcon className="h-5 w-5 text-primary" />
											{getTypeLabel(type)} ({stats.length})
										</h3>

										<div className="space-y-3">
											{displayedStats.map(stat => (
												<div
													key={stat.id}
													className="flex items-center justify-between gap-4 py-2 border-b border-foreground/5 last:border-b-0"
												>
													<div className="flex-1 flex items-center gap-3">
														<div className="flex flex-col">
															<p className="text-lg font-semibold text-foreground">
																{stat.value}{" "}
																<span className="text-sm font-normal text-muted-foreground">
																	{stat.unit}
																</span>
															</p>
															<p className="text-xs text-muted-foreground">
																{format(new Date(stat.date), "MMM dd, yyyy")}
															</p>
														</div>
													</div>

													<div className="flex items-center gap-2 shrink-0">
														<Pill variant={getStatusVariant(stat.status)}>{stat.status}</Pill>
														<EditHealthStatsForm patient={patient} healthStat={stat} />
														<Button
															variant="outline"
															size="icon"
															className="hover:text-destructive-dark hover:bg-destructive-light [&_svg]:size-5"
															onClick={() => handleDelete(stat.id)}
															disabled={deleteMutation.isPending}
														>
															<Trash />
														</Button>
													</div>
												</div>
											))}
										</div>

										{hasMore && (
											<Button onClick={() => toggleGroup(type)} variant="outline" size="sm" className="mt-3">
												{isExpanded ? (
													<>
														Show less
														<ChevronUp className="h-4 w-4" />
													</>
												) : (
													<>
														Show {remainingCount} more
														<ChevronDown className="h-4 w-4" />
													</>
												)}
											</Button>
										)}
									</div>
								);
							})}
						</div>
					)}
				</CardContent>
			</Card>
		</>
	);
};
